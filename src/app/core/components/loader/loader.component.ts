import { Component } from "@angular/core";
import { LoaderService } from "@core/services";

@Component({
  selector: "chat-live-loader",
  standalone: true,
  templateUrl: "./loader.component.html",
  styleUrl: "./loader.component.scss",
})
export class LoaderComponent {
  constructor(protected loaderService: LoaderService) {}
}
