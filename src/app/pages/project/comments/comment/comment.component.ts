import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../../../shared/models/comment";
import {AuthService} from "../../../../core/auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() likedComments!: Comment[];
  @Output() deleteComment = new EventEmitter<any>();
  isAdmin$!: BehaviorSubject<boolean>;
  uid!: BehaviorSubject<string>;
  isLoggedIn$!: BehaviorSubject<boolean>;

  constructor(private auth: AuthService) {
    this.isAdmin$ = this.auth.isAdmin$;
    this.uid = this.auth.userId$;
    this.isLoggedIn$ = this.auth.isLoggedIn$;
  }

  ngOnInit(): void {
  }

  onDelete(comment_id: number){
    this.deleteComment.emit(comment_id);
  }



}
