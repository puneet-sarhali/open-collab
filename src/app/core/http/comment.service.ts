import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../../shared/models/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = "http://localhost:4999/projects/comments"
  constructor(private http: HttpClient) { }

  getComments(projectId: number){
    return this.http.get<Comment[]>(this.baseUrl + "/" + projectId);
  }

  postComment(commentData: Comment){
    return this.http.post<Comment>(this.baseUrl + "/" + commentData.project_id, commentData);
  }

  likeComment(projectId: number, commentId: number){
    return this.http.patch<Comment>(this.baseUrl + `/${projectId}/${commentId}`, {"like_value": 1});
  }
  removeLike(projectId: number, commentId: number){
    return this.http.patch<Comment>(this.baseUrl + `/${projectId}/${commentId}`, {"like_value": -1});
  }

  deleteComment(projectId: number, commentId: number){
    return this.http.delete(this.baseUrl + `/${projectId}/${commentId}`);
  }

}
