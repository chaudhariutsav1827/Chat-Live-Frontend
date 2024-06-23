import { Component, effect } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { MessageBoxComponent } from "./components/message-box/message-box.component";
import { ChatService } from "src/app/shared/services/chat.service";
import { MessageRepository } from "../../repositories/message.repository";
import { RequiredFormsModule } from "src/app/shared/modules/required-forms.module";
import { debounce } from "lodash";
import { SocketService } from "@core/services";

@Component({
  selector: "chat-live-home",
  imports: [RequiredFormsModule, HeaderComponent, SidebarComponent, MessageBoxComponent],
  providers: [MessageRepository],
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  message: string;

  constructor(
    protected chatService: ChatService,
    private messageRepo: MessageRepository,
    private socketService: SocketService
  ) {
    this.#setMessage();
    this.#getAllMessages();

    effect(() => {
      this.#setMessage();
    });
  }

  debounceMessageChange = debounce(this.#onMessageChange, 500);

  sendMessage() {
    if (!this.message.trim() || !this.chatService.currentChatUser()) return;
    const newMessage = {
      to: this.chatService.currentChatUser()!._id,
      message: this.message,
    };
    this.messageRepo.send(newMessage).subscribe({
      next: (res) => {
        if (res.success) {
          this.chatService.addNewMessage(res.data);
          this.message = "";
          this.#onMessageChange(this.message);
        }
      },
    });
  }

  #onMessageChange(message: string) {
    const currentChatUser = this.chatService.currentChatUser()!._id;
    this.chatService.messageDrafts.update((drafts) => {
      const draft = drafts.find((draft) => draft.userId === currentChatUser);
      if (draft) {
        draft.message = message;
      } else {
        const draft = {
          userId: currentChatUser,
          message: message,
        };
        drafts.push(draft);
      }
      return drafts;
    });
  }

  #setMessage() {
    const message = this.chatService
      .messageDrafts()
      .find((draft) => draft.userId === this.chatService.currentChatUser()?._id)?.message;
    this.message = message ?? "";
  }

  #getAllMessages() {
    this.messageRepo.allMessages().subscribe({
      next: (res) => {
        if (res.success) {
          this.chatService.setMessages(res.data);
        }
      },
    });
  }
}
