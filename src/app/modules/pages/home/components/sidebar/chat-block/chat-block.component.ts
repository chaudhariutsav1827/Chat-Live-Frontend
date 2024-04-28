import { Component, Input, OnInit } from "@angular/core";
import { IUser } from "../../../models/home.interface";
import { ChatService } from "src/app/shared/services/chat.service";

@Component({
  selector: "chat-live-chat-block",
  standalone: true,
  imports: [],
  templateUrl: "./chat-block.component.html",
  styleUrl: "./chat-block.component.scss",
})
export class ChatBlockComponent implements OnInit {
  @Input({ required: true }) user: IUser;
  unreadMessages: number;
  constructor(protected chatService: ChatService) {}

  ngOnInit() {
    this.getUnreadMessages();
  }

  selectChat(user: IUser) {
    this.chatService.currentChatUser.set(user);
  }

  private getUnreadMessages() {
    this.unreadMessages = this.chatService
      .messages()
      .filter((message) => message._id === this.user._id && message.seen === false).length;
  }
}
