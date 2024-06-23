export interface IMessage {
  _id: string;
  from: string;
  to: string;
  message: string;
  seen: boolean;
  createdAt: string;
}

export interface ISendMessageRequest {
  to: string;
  message: string;
}

export interface IMessageDrafts {
  userId: string;
  message: string;
}

export interface IGroupedMessage {
  date: string;
  dateTag: string;
  messages: IMessage[];
}

export interface IChatUser {
  chatUserId: string;
  groupedMessages: IGroupedMessage[];
}

export interface IUnreadMessage {
  chatUserId: string;
  unreadMessages: number;
}
