import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { RoutingPaths } from "@core/constants";
import { AuthService } from "@core/services";

export /**
 * NOTE: This Guard will check if user is logged in or not
 * @returns
 */
const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isTokenExpired()) {
    localStorage.clear();
    // TODO : Show toaster of "Session Ended" here
    return router.parseUrl(RoutingPaths.BLANK_ROUTE);
  }

  return true;
};
