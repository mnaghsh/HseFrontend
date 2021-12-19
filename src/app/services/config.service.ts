import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
baseUrl = 'https://localhost:44377/api/'
mscServices = 'https://services.msc.ir/'
//baseUrl = 'http://93.126.21.21:8082/api/'


  constructor(public http: HttpClient) {
  }

  public get(url: string, options?: any) {
    return this.http.get<any[]>(this.baseUrl + url, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete<any[]>(this.baseUrl + url, options);
  }

  public post(url: string, body, options?: any) {
    return this.http.post(this.baseUrl + url, body, options);
  }

  public put(url: string, body, options?: any) {
    return this.http.put(this.baseUrl + url, body, options);
  }

  public isSuiteLogin(url: string, body, options?: any) {
    return this.http.post(this.mscServices + url, body, options);
  }
  public getIsSuiteToken(url: string, body, options?: any) {
    return this.http.post(this.mscServices + url, body, options);
  }

}
