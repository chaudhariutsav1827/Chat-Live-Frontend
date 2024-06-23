import { Component } from "@angular/core";
import { UserRepository } from "src/app/modules/repositories/user.repository";
import { IUser } from "../../models/home.interface";
import { ChatService } from "src/app/shared/services/chat.service";
import { ChatBlockComponent } from "./chat-block/chat-block.component";
import { AuthService } from "@core/services";
import { ILoggedUser } from "@core/models/interfaces";

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
  loggedUser: ILoggedUser;
  constructor(private userRepo: UserRepository, protected chatService: ChatService, private authService: AuthService) {
    this.loggedUser = this.authService.getUser();
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
