import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Tag} from "../models/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  API_URL = environment.API_URL
  url = 'tags/'


  constructor(
    private readonly http: HttpClient
  ) {
  }

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.API_URL + this.url)
  }

  create(tag: any): Observable<Tag> {
    return this.http.post<any>(this.API_URL + this.url, tag)
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.API_URL + this.url + `${id}/`)
  }
  getByID(id: number): Observable<Tag> {
    return this.http.get<Tag>(this.API_URL + this.url + `${id}/`)
  }
  update(tag: any, id: number): Observable<Tag> {
    return this.http.put<Tag>(this.API_URL + this.url + `${id}/`,tag)
  }
}
