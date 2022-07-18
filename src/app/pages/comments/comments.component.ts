/*
Generated using ng generate component comments
*/
import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment';

/** Replace import with service import */
//import { NOTES } from '../starting-comments';
import { CommentService } from '../comment.service';;


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {

  /**
  comment: Comment = {
    id: 1,
    name: 'How To',
    content: 'Enter some text for a new comment!'
  };
  */
  //comments = NOTES;
  //selectedComment?: Comment;
  comments: Comment[] = [];

  constructor(private commentService: CommentService) { 
    // Could get comments here, but bad practice
  }

  ngOnInit(): void {
    this.getComments();
  }

  // Only works synchronously
  // Change if not using mock comments - for real database
  /**
  getComments(): void {
    this.comments = this.commentService.getComments();
  }
  */
  
  // Asyncronous approach to handle server requests
  getComments(): void {
    this.commentService.getComments().subscribe(comments => this.comments = comments);
  }

  /**
  onSelect(comment: Comment): void {
    this.selectedComment = comment;
    this.messageService.add(`CommentsComponent: Selected comment id=${comment.id}`);
  }
  */

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }

    this.commentService.addComment({ name } as Comment)
      .subscribe(comment => {
        this.comments.push(comment);
      });
  }

  delete(comment: Comment): void {
    this.comments = this.comments.filter(n => n !== comment);
    this.commentService.deleteComment(comment.id).subscribe();
  }
}