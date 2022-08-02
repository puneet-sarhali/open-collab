import {Component, EventEmitter, OnInit} from '@angular/core';
import {CommentService} from "../../../core/http/comment.service";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../../shared/models/comment";
import {AuthService} from "../../../core/auth/auth.service";
import {ToastService} from "../../../core/services/toast.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments!: Comment[];
  formContent!: string;
  constructor(private route: ActivatedRoute,
              private commentService: CommentService,
              private auth: AuthService,
              private toast: ToastService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((param) => {
        return this.commentService.getComments(parseInt(param.get('id')!))
      })
    ).subscribe(res => this.comments = res)
  }

  onSubmit(){
    if(this.formContent){

      this.route.paramMap.subscribe(res=> {
        const data:Comment = {
          comment_id: 0,
          project_id: parseInt(res.get('id')!),
          author_uid: this.auth.uid!,
          name: this.auth.name!,
          posted_on: new Date(),
          like_count: 0,
          content: this.formContent
        }
        this.commentService.postComment(data).subscribe({
          next: (res) => {
            this.toast.genericSuccess();
            this.comments.push(data);
            console.log(res);
          },
          error: () => this.toast.genericError("Comment Post Failed.")
        })
      })


      // this.commentService.postComment()
    }
  }

  onDelete(comment_id: number){
    this.route.paramMap.subscribe(res=> {
      this.commentService.deleteComment(parseInt(res.get('id')!), comment_id).subscribe({
        next: () => {
          this.toast.genericSuccess();
          this.comments = this.comments.filter((comment) =>{
            return comment.comment_id != comment_id
          })
        },
        error: () => this.toast.genericError("Couldn't delete comment.")
      })
    })
  }


}
