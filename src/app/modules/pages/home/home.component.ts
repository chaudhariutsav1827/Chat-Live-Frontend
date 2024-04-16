import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MessageBoxComponent } from "../message-box/message-box.component";

@Component({
  selector: "chat-live-home",
  imports: [HeaderComponent, SidebarComponent, MessageBoxComponent],
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
