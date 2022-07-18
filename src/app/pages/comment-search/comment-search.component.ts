import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Comment } from '../comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-search',
  templateUrl: './comment-search.component.html',
  styleUrls: [ './comment-search.component.css' ]
})
export class CommentSearchComponent implements OnInit {

  // Use comments as observable
  comments$!: Observable<Comment[]>;
  private searchTerms = new Subject<string>();

  constructor(private commentService: CommentService) {}

  // Add search term to observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.comments$ = this.searchTerms.pipe(
      // Milliseconds to wait before searching for key
      debounceTime(100),
      distinctUntilChanged(),

      // Change observable when search entry changes
      switchMap((term: string) => this.commentService.searchComments(term)),
    );
  }
}