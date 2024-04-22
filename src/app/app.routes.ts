import { Routes } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";
import { LoginComponent } from "./modules/pages/login/login.component";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LoginComponent,
  },
  {
    path: "home",
    pathMatch: "full",
    component: HomeComponent,
  },
];
