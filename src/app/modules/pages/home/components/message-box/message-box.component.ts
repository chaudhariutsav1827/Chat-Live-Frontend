import { AuthService } from "@core/services";
import { ChatService } from "src/app/shared/services/chat.service";
import { Component } from "@angular/core";
import { ILoggedUser } from "@core/models/interfaces";
import { IMessage } from "./models/message.interface";
import { IUser } from "../../models/home.interface";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { toZonedTime, format } from "date-fns-tz";

@Component({
  selector: "chat-live-message-box",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./message-box.component.html",
  styleUrl: "./message-box.component.scss",
})
export class MessageBoxComponent {
  currentChatUser: IUser;
  loggedUser: ILoggedUser;
  messages: IMessage[];
  constructor(protected chatService: ChatService, private authService: AuthService) {
    this.currentChatUser = this.chatService.currentChatUser()!;
    this.#setUser();
    this.#setMessages();
  }

  #setUser() {
    const loggedUser = this.authService.getUser();
    loggedUser ? (this.loggedUser = loggedUser) : this.authService.logout();
  }

  #setMessages() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const pattern = "d.M.yyyy HH:mm";
    const messages = this.chatService
      .messages()
      .filter((message) => message.from === this.currentChatUser._id || message.to === this.currentChatUser._id);
    console.log(messages);
    this.messages = messages.map((message) => {
      const zonedDate = toZonedTime(new Date(message.createdAt), timeZone);
      return { ...message, createdAt: format(zonedDate, pattern) };
    });
  }
}
