import { Injectable } from "@angular/core";
import { BaseService } from "@core/services";
import { Endpoints } from "@core/constants/end-points.constant";
import { Observable } from "rxjs";
import { IResponse } from "@core/models/interfaces";
import { IUser } from "../pages/home/models/home.interface";

@Injectable()
export class UserRepository {
  constructor(private baseService: BaseService) {}

  getUsers(): Observable<IResponse<IUser[]>> {
    return this.baseService.get(Endpoints.user.AllUsers.url);
  }
}
