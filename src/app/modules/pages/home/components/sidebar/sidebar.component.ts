import { Component } from "@angular/core";
import { UserRepository } from "src/app/modules/repositories/user.repository";
import { IUser } from "../../models/home.interface";
import { ChatService } from "src/app/shared/services/chat.service";
import { ChatBlockComponent } from "./chat-block/chat-block.component";

@Component({
  selector: "chat-live-sidebar",
  standalone: true,
  imports: [ChatBlockComponent],
  providers: [UserRepository],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  users: IUser[] = [];
  constructor(private userRepo: UserRepository, protected chatService: ChatService) {
    this.getAllUsers();
  }

  private getAllUsers() {
    this.userRepo.getUsers().subscribe({
      next: (res) => {
        if (res.success) {
          this.users = res.data;
        }
      },
    });
  }
}
