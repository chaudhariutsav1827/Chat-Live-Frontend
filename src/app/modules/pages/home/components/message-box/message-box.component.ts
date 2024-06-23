import { AuthService, SocketService } from "@core/services";
import { ChatService } from "src/app/shared/services/chat.service";
import { AfterViewInit, Component, ElementRef, ViewChild, effect } from "@angular/core";
import { ILoggedUser } from "@core/models/interfaces";
import { IGroupedMessage } from "./models/message.interface";
import { IUser } from "../../models/home.interface";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { compareAsc } from "date-fns";

@Component({
  selector: "chat-live-message-box",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./message-box.component.html",
  styleUrl: "./message-box.component.scss",
})
export class MessageBoxComponent implements AfterViewInit {
  @ViewChild("messageBox") messageBox: ElementRef;
  currentChatUser: IUser;
  loggedUser: ILoggedUser;
  groupedMessage: IGroupedMessage[] = [];

  constructor(
    protected chatService: ChatService,
    private authService: AuthService,
    private socketService: SocketService
  ) {
    this.currentChatUser = this.chatService.currentChatUser()!;
    this.loggedUser = this.authService.getUser();
    this.#getMessages();
    // this.#newMessage();
    effect(() => {
      if (this.chatService.messages()) {
        console.log("new Message");
        
        setTimeout(() => {
          this.scrollToEnd("smooth");
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.scrollToEnd("auto");
  }

  #newMessage() {
    this.socketService.socket.on("new-message", (message) => {
      this.chatService.addNewMessage(message);
      setTimeout(() => {
        this.scrollToEnd("smooth");
      });
    });
  }

  scrollToEnd(behavior: string) {
    console.log("scrolling to end");
    
    const element = this.messageBox.nativeElement;
    element.scrollTo({ top: element.scrollHeight, behavior: behavior });
  }

  #getMessages() {
    this.groupedMessage = this.chatService.getUserChat(this.currentChatUser._id);
    this.groupedMessage.sort((a, b) => {
      return compareAsc(new Date(a.date), new Date(b.date));
    });
  }
}
