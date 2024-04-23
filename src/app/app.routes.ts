import { Routes } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";
import { LoginComponent } from "./modules/pages/login/login.component";
import { authGuard, loginRedirectGuard } from "@core/guards";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LoginComponent,
    canActivate: [loginRedirectGuard],
  },
  {
    path: "home",
    pathMatch: "full",
    component: HomeComponent,
    canActivate: [authGuard],
  },
];
