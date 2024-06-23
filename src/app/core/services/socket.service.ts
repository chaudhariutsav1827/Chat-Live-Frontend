import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { ChatService } from "src/app/shared/services/chat.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  socket: Socket;
  constructor(private chatService: ChatService, private authService: AuthService) {
    this.socket = io("ws://localhost:1827");
    this.#joinGroup();
    this.#newMessage();
  }

  #newMessage() {
    this.socket.on("new-message", (message) => {
      this.chatService.addNewMessage(message);
    });
  }

  #joinGroup() {
    this.socket.emit("join", this.authService.getUser().id);
  }

  disconnectSocket() {
    this.socket.disconnect();
  }
}
