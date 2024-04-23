import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { RoutingPaths } from "@core/constants";
import { AuthService } from "@core/services";

export /**
 * NOTE: This guard will redirect user to main page from login if user is already logged in
 * @returns
 */
const loginRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getToken();
  return token ? router.parseUrl(RoutingPaths.Home) : true;
};
