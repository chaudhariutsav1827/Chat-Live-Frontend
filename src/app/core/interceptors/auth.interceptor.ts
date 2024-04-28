import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@core/services";
import { Observable } from "rxjs";

/**
 * NOTE: Add access token to every request header
 */
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  if (authToken) {
    const reqWithHeader = req.clone({
      headers: req.headers.append("Authorization", `${authToken}`),
    });
    return next(reqWithHeader);
  }
  authService.logout();
  return next(req);
}
