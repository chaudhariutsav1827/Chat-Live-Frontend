import { Injectable } from "@angular/core";
import { BaseService } from "@core/services";
import { ILoginRequest, ILoginResponse } from "../pages/login/models/login.interface";
import { Endpoints } from "@core/constants/end-points.constant";
import { Observable } from "rxjs";
import { IResponse } from "@core/models/interfaces";

@Injectable()
export class LoginRepository {
  constructor(private baseService: BaseService) {}

  login(data: ILoginRequest): Observable<IResponse<ILoginResponse>> {
    return this.baseService.post(Endpoints.user.Login.url, data);
  }
}
