import { environment } from "src/environments/environment";

enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
interface EndpointDefinition {
  url: string;
  method: HttpMethods;
}

enum Controllers {
  USER = "user",
}

const createEndpoint = (controller: Controllers, path: string, method: HttpMethods): EndpointDefinition => {
  return {
    url: `${environment.baseUrl}/${controller}/${path}`,
    method,
  };
};

export const Endpoints = {
  user: {
    Register: createEndpoint(Controllers.USER, "register", HttpMethods.POST),
    Login: createEndpoint(Controllers.USER, "login", HttpMethods.POST),
    ForgotPassword: createEndpoint(Controllers.USER, "forgot-password", HttpMethods.POST),
    ResetPassword: createEndpoint(Controllers.USER, "reset-password", HttpMethods.POST),
    Logout: createEndpoint(Controllers.USER, "logout", HttpMethods.POST),
    Profile: createEndpoint(Controllers.USER, "me", HttpMethods.GET),
  },
};
