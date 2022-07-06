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

  onUpvote(){

  }
  onDownvote(){

  }
}
