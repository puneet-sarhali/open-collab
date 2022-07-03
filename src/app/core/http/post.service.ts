import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Post} from "../../shared/models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "http://localhost:4999/"
  constructor(private http: HttpClient) { }

  // /post
  getPosts(){
    return this.http.get<Post[]>(this.url + "posts");
  }

}
