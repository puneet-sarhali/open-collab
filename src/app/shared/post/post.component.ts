import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Project } from 'src/app/shared/models/project';
import {User} from "../models/user";
import {Vote} from "../models/vote";
import {Observable} from "rxjs";




enum VoteVal{
  upVote,
  downVote,
  noVote
}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() inputData!: [Project, User];
  @Input()  currentUserVotes!: Observable<Vote[]>;
  @Output() voteVal: EventEmitter<{value: boolean, method: string, projectid: string}> = new EventEmitter;

  voteValue: VoteVal = VoteVal.noVote;
  constructor() {

  }

  ngOnInit(): void {
    this.currentUserVotes.subscribe((votes) => {
      votes.forEach((vote) => {
        if(vote.projectid === this.inputData[0].projectid){
          if(vote.votevalue){
            this.voteValue = VoteVal.upVote;
          }else {
            this.voteValue = VoteVal.downVote;
          }
        }
      })
    })
  }

  onUpvote(projectid: string){
    if(this.voteValue === VoteVal.downVote){
      this.voteValue = VoteVal.upVote;
      const res = {
        "value": true,
        "method": "put",
        "projectid": projectid
      }
      return this.voteVal.emit(res);
    } else if(this.voteValue === VoteVal.upVote){
      this.voteValue = VoteVal.noVote;
      const res = {
        "value": true,
        "method": "delete",
        "projectid": projectid
      }
      return this.voteVal.emit(res);
    } else{
      this.voteValue = VoteVal.upVote;
      const res = {
        "value": true,
        "method": "post",
        "projectid": projectid
      }
      return this.voteVal.emit(res);
    }

  }
  onDownvote(){
    if(this.voteValue === VoteVal.downVote){
      this.voteValue = VoteVal.noVote;
    } else if(this.voteValue === VoteVal.upVote){
      this.voteValue = VoteVal.downVote;
    } else{
      this.voteValue = VoteVal.downVote;
    }
  }
}
