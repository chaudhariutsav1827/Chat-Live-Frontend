import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { ChatService } from "src/app/shared/services/chat.service";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private webSocket: Socket;
  constructor(private chatService: ChatService) {
    this.webSocket = io("ws://localhost:1827");
    this.newMessage();
  }

  private newMessage() {
    this.webSocket.on("newMessage", (message) => {
      this.chatService.addNewMessage(message);
    });
  }

  connectSocket(message: unknown) {
    this.webSocket.emit("connect", message);
  }

  disconnectSocket() {
    this.webSocket.disconnect();
  }
}
