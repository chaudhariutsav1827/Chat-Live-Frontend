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
