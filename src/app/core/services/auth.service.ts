import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageKeys } from "@core/constants";
import { RoutingPaths } from "@core/constants";
import { IJwtToken, ILoggedUser } from "@core/models/interfaces";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router) {}

  private token: string;
  private user: ILoggedUser;

  setToken(token: string) {
    localStorage.setItem(LocalStorageKeys.TOKEN, token);
    this.token = token;
    this.setUser();
  }

  getToken(): string | null {
    return this.token ?? localStorage.getItem(LocalStorageKeys.TOKEN);
  }

  getUser(): ILoggedUser | null {
    if (this.user) return this.user;
    this.setUser();
    return this.user;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const expiryTime = Number(jwtDecode(token).exp);
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate([RoutingPaths.BLANK_ROUTE]);
  }

  private setUser() {
    const token = this.getToken();
    if (token) {
      const decodedToken: IJwtToken = jwtDecode(token);
      this.user = {
        id: decodedToken._id,
        email: decodedToken.email,
        role: decodedToken.role,
      };
    }
  }
}
