import { Injectable, signal } from "@angular/core";
import _ from "lodash";
import { IMessage, IMessageDrafts } from "src/app/modules/pages/home/components/message-box/models/message.interface";
import { IUser } from "src/app/modules/pages/home/models/home.interface";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  currentChatUser = signal<IUser | null>(null, { equal: _.isEqual });
  messages = signal<IMessage[]>([]);
  messageDrafts = signal<IMessageDrafts[]>([]);

  addNewMessage(newMessage: IMessage) {
    this.messages.update((messages) => {
      messages.push(newMessage);
      return messages;
    });
  }
}
