import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class HttpLocalClient {
public BASE_URL: string;

  constructor(
    public http: HttpClient,
  ) {
    this.BASE_URL = environment.client.base_url;
  }

  getHeaders() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return {
      headers: headers,
    };
  }

  get BaseUrl() {
    return this.BASE_URL;
  }

  /**
   * T is the Response model 
   * @param url 
   * @returns T
   */
  getT<T>(url: string) {
    return this.http.get<T>(this.BASE_URL + url, this.getHeaders());
  }
  /**
   * T is the POST model 
   * @param url 
   * @param data 
   * @returns any
   */
  postJsonT<T>(url: string, data: T) {
    return this.http.post<any>(this.BASE_URL + url + "?", data, this.getHeaders());
  }
  /**
   * R is the Response model 
   * @param url 
   * @param data 
   * @returns R
   */
  postJsonR<R>(url: string, data: any) {
    return this.http.post<R>(this.BASE_URL + url + "?", data, this.getHeaders());
  }
  /**
   * T is the POST model 
   * 
   * R is the Response model
   * @param url 
   * @param data 
   * @returns R
   */
  postJsonTR<T, R>(url: string, data: T) {
    return this.http.post<R>(this.BASE_URL + url + "?", data, this.getHeaders());
  }
  /**
   * 
   * @param url 
   * @param data 
   * @returns any
   */
  putT<T>(url: string, data: any) {
    return this.http.put<T>(this.BASE_URL + url, data, this.getHeaders());
  }
  /**
   * 
   * @param url 
   * @param data 
   * @returns any
   */
  deleteT<T>(url: string, data?: any) {
    const options = {
      ...this.getHeaders(),
      body: data
    }
    return this.http.delete<T>(this.BASE_URL + url, options);
  }


}
