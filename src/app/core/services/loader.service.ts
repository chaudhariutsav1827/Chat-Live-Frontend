import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  constructor() {}

  readonly isLoading = signal<boolean>(false);

  toggleLoadingState() {
    this.isLoading.update((state) => !state);
  }
}
