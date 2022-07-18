/** 
Generated with 'ng generate service comment'
Tutorial: https://angular.io/tutorial/toh-pt4 
Can get data from web service or locally etc.
*/
import { Injectable } from '@angular/core';

// Set up for mock data
import { Comment } from './comment';
//import { NOTES } from './starting-comments';

// Angular HttpClient methods return RxJS Obervables
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // Angular injects the parameter into the property when creating CommentService
  // Service-in-service: Links MessageService to CommentService
  //constructor(private messageService: MessageService) {}

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  getComments(): Observable<Comment[]> {
    //const comments = of(NOTES);
    //this.messageService.add('CommentService: fetched comments');
    //return comments;
    return this.http.get<Comment[]>(this.commentsUrl)
        .pipe(
          tap(_ => this.log('fetched comments')),
          catchError(this.handleError<Comment[]>('getComments', []))
      );
  }
  

  // Return array of mock comments
  getComment(id: number): Observable<Comment> {

    const url = `${this.commentsUrl}/${id}`;
  
    return this.http.get<Comment>(url).pipe(
      tap(_ => this.log(`fetched comment id=${id}`)),
      catchError(this.handleError<Comment>(`getComment id=${id}`))
    );
  }

  private log(message: string) {
  }

  // URL to mock web api for comments
  private commentsUrl = 'api/comments';  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  updateComment(comment: Comment): Observable<any> {
    return this.http.put(this.commentsUrl, comment, this.httpOptions).pipe(
      tap(_ => this.log(`updated comment id=${comment.id}`)),
      catchError(this.handleError<any>('updateComment'))
    );
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment, this.httpOptions).pipe(
      tap((newComment: Comment) => this.log(`added comment w/ id=${newComment.id}`)),
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  deleteComment(id: number): Observable<Comment> {
    const url = `${this.commentsUrl}/${id}`;

    return this.http.delete<Comment>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted comment id=${id}`)),
      catchError(this.handleError<Comment>('deleteComment'))
    );
  }

  searchComments(term: string): Observable<Comment[]> {
    if (!term.trim()) {
      // if not search term, return empty comment array.
      return of([]);
    }
    return this.http.get<Comment[]>(`${this.commentsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found comments matching "${term}"`) :
         this.log(`no comments matching "${term}"`)),
      catchError(this.handleError<Comment[]>('searchComments', []))
    );
  }

  getCommentNo404<Data>(id: number): Observable<Comment> {
    const url = `${this.commentsUrl}/?id=${id}`;
    return this.http.get<Comment[]>(url)
      .pipe(
        map(comments => comments[0]), // returns a {0|1} element array
        tap(n => {
          const outcome = n ? 'fetched' : 'did not find';
          this.log(`${outcome} comment id=${id}`);
        }),
        catchError(this.handleError<Comment>(`getComment id=${id}`))
      );
  }
}
