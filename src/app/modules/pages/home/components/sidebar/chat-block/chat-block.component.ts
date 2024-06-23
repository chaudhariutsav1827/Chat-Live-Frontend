import { Component, Input, OnInit } from "@angular/core";
import { IUser } from "../../../models/home.interface";
import { ChatService } from "src/app/shared/services/chat.service";
import { IMessage } from "../../message-box/models/message.interface";

@Component({
  selector: "chat-live-chat-block",
  standalone: true,
  imports: [],
  templateUrl: "./chat-block.component.html",
  styleUrl: "./chat-block.component.scss",
})
export class ChatBlockComponent implements OnInit {
  @Input({ required: true }) user: IUser;
  unseenMessages: IMessage[] = [];
  constructor(protected chatService: ChatService) {
  }

  ngOnInit(): void {
    this.#getUnreadMessages();
  }

  selectChat(user: IUser) {
    this.chatService.currentChatUser.set(user);
  }

  #getUnreadMessages() {
    // const unseenMessages: IMessage[] = [];
    // const messagesByDate = this.chatService.messages().get(this.user._id) ?? {};
    // Object.values(messagesByDate).forEach((messages: IMessage[]) => {
    //   unseenMessages.push(...messages.filter((message: IMessage) => !message.seen));
    // });
    // this.unseenMessages = unseenMessages;
  }
}
