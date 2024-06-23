import { Injectable, ViewChild, signal } from "@angular/core";
import { AuthService } from "@core/services";
import { isThisWeek, isToday, isYesterday } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";
import { isEqual } from "lodash";
import { MessageBoxComponent } from "src/app/modules/pages/home/components/message-box/message-box.component";
import {
  IChatUser,
  IMessage,
  IMessageDrafts,
  IUnreadMessage,
} from "src/app/modules/pages/home/components/message-box/models/message.interface";
import { IUser } from "src/app/modules/pages/home/models/home.interface";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  @ViewChild(MessageBoxComponent, { static: false })
  private messageBoxRef: MessageBoxComponent;
  currentChatUser = signal<IUser | null>(null, { equal: isEqual });
  messageDrafts = signal<IMessageDrafts[]>([]);
  messages = signal<IChatUser[]>([], { equal: isEqual });
  #messageNotification = signal<IUnreadMessage[]>([]);
  #loggedUserId: string;
  #timeZone: string;

  constructor(private authService: AuthService) {
    this.#loggedUserId = this.authService.getUser().id;
    this.#timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  addNewMessage(newMessage: IMessage) {
    this.#setMessage(newMessage);
    console.log("new message");
    console.log("if in message box", this.messageBoxRef);

    if (this.messageBoxRef) {
      // this.messageBoxRef.scrollToEnd("smooth");
    }
  }

  setMessages(messages: IMessage[]) {
    messages.forEach((message) => {
      this.#setMessage(message);
    });
  }

  getUserChat(chatUserId: string) {
    return this.messages().find((chat) => chat.chatUserId == chatUserId)?.groupedMessages ?? [];
  }

  #formatDateKey(timestamp: string) {
    const localDate = toZonedTime(new Date(timestamp), this.#timeZone);
    if (isToday(localDate)) return "Today";
    else if (isYesterday(localDate)) return "Yesterday";
    else if (isThisWeek(localDate, { weekStartsOn: 1 })) {
      const weekdayName = format(localDate, "EEEE", { timeZone: this.#timeZone });
      return weekdayName;
    }
    return format(localDate, "EEE, dd MMM");
  }

  #setMessage(message: IMessage) {
    if (message.from === this.#loggedUserId) {
      this.#setMessageValue(message, message.to);
    }
    if (message.to === this.#loggedUserId) {
      this.#setMessageValue(message, message.from);
    }
  }

  #setMessageValue(message: IMessage, senderOrReceiverId: string) {
    const isMessageMapExist = this.messages().some((chat) => chat.chatUserId == senderOrReceiverId);
    if (!isMessageMapExist) {
      const newChatUser = {
        chatUserId: senderOrReceiverId,
        groupedMessages: [],
      };
      this.messages.update((messages) => {
        messages.push(newChatUser);
        return messages;
      });
    }
    this.messages.update((messages) => {
      const messageMap = messages.find((chat) => chat.chatUserId == senderOrReceiverId);
      const dateKey = this.#formatDateKey(message.createdAt);
      const isGroupExist = messageMap?.groupedMessages.some((group) => group.dateTag == dateKey);
      if (!isGroupExist) {
        const newGroup = {
          date: format(new Date(message.createdAt), "dd/MM/yyyy"),
          dateTag: dateKey,
          messages: [],
        };
        messageMap?.groupedMessages.push(newGroup);
      }
      const messageGroup = messageMap?.groupedMessages.find((group) => group.dateTag == dateKey);
      messageGroup?.messages.push(message);
      return messages;
    });
  }
}
