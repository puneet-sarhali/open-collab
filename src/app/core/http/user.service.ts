import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../../shared/models/user";
import {Vote} from "../../shared/models/vote";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:4999/users"
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.url);
  }

  createUser(user: User){
    return this.http.post<User>(this.url, user);
  }

  getUser(uid: string){
    return this.http.get<User>(this.url + `/${uid}`);
  }

  vote(data: Vote){
    return this.http.post<Vote>(this.url + `/votes/${data.userid}/${data.projectid}`, data);
  }

  updateVote(data: Vote){
    return this.http.put<Vote>(this.url + `/votes/${data.userid}/${data.projectid}`, data);
  }

  deleteVote(data: Vote){
    return this.http.delete<Vote>(this.url + `/votes/${data.userid}/${data.projectid}`);
  }

  getVotes(uid: string){
    return this.http.get<Vote[]>(this.url + `/votes/${uid}`);
  }


}
