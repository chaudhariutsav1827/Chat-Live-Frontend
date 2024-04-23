import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

type HttpParamsObject = {
  [param: string]: string | number | boolean | (string | number | boolean)[];
};

@Injectable({
  providedIn: "root",
})
export class BaseService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: HttpParamsObject): Observable<T> {
    return this.http.get<T>(url, {
      params: new HttpParams({ fromObject: params }),
    });
  }

  delete<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(url, {
      params: params,
    });
  }

  update<T>(url: string, id: number, model: unknown): Observable<T> {
    const urlForCall = !id ? url : url + "/" + id;
    return this.http.put<T>(urlForCall, model);
  }

  post<T>(url: string, model: unknown): Observable<T> {
    return this.http.post<T>(url, model);
  }

  put<T>(url: string, model: unknown): Observable<T> {
    return this.http.put<T>(url, model);
  }
}
