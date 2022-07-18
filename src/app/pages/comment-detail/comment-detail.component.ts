import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})

export class CommentDetailComponent implements OnInit {

  //@Input() comment?: Comment;
  comment: Comment | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getComment();
  }

  getComment(): void {
    //const id = Number(this.route.snapshot.paramMap.get('id'));
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.commentService.getComment(id)
      .subscribe(comment => this.comment = comment);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.comment) {
      this.commentService.updateComment(this.comment)
        .subscribe(() => this.goBack());
    }
  }

}
