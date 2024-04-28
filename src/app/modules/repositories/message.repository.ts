import { Injectable } from "@angular/core";
import { BaseService } from "@core/services";
import { Endpoints } from "@core/constants/end-points.constant";
import { Observable } from "rxjs";
import { IResponse } from "@core/models/interfaces";
import { IMessage, ISendMessageRequest } from "../pages/home/components/message-box/models/message.interface";

@Injectable()
export class MessageRepository {
  constructor(private baseService: BaseService) {}

  allMessages(): Observable<IResponse<IMessage[]>> {
    return this.baseService.get(Endpoints.message.AllMessage.url);
  }

  send(message: ISendMessageRequest): Observable<IResponse<IMessage>> {
    return this.baseService.post(Endpoints.message.Send.url, message);
  }
}
