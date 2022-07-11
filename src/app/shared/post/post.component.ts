import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Project } from 'src/app/shared/models/project';
import {Vote} from "../models/vote";
import {Observable} from "rxjs";
import {ProjectService} from "../../core/http/project.service";
import {UserService} from "../../core/http/user.service";
import {AuthService} from "../../core/auth/auth.service";




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
  @Input() project!: Project;
  @Input()  currentUserVotes!: Observable<Vote[]>;
  @Input() fromProject: boolean = false;

  voteValue: VoteVal = VoteVal.noVote;
  constructor(private ps: ProjectService, private userService: UserService, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.currentUserVotes.subscribe((votes) => {
      votes.forEach((vote) => {
        if(vote.projectid === this.project.projectid){
          if(vote.votevalue){
            this.voteValue = VoteVal.upVote;
          }else {
            this.voteValue = VoteVal.downVote;
          }
        }
      })
    })
  }

  onUpvote(projectid: number){
    if(this.voteValue === VoteVal.downVote){
      this.project.score += 2;
      this.voteValue = VoteVal.upVote;
      const res = {
        "value": true,
        "method": "put",
        "projectid": projectid
      }
      this.onVote(res);
    } else if(this.voteValue === VoteVal.upVote){
      this.project.score--;
      this.voteValue = VoteVal.noVote;
      const res = {
        "value": true,
        "method": "delete",
        "projectid": projectid
      }
      this.onVote(res);
    } else{
      this.project.score++;
      this.voteValue = VoteVal.upVote;
      const res = {
        "value": true,
        "method": "post",
        "projectid": projectid
      }
      this.onVote(res);
    }

  }
  onDownvote(projectid: number){
    if(this.voteValue === VoteVal.upVote){
      this.project.score -= 2;
      this.voteValue = VoteVal.downVote;
      const res = {
        "value": false,
        "method": "put",
        "projectid": projectid
      }
      this.onVote(res);
    } else if(this.voteValue === VoteVal.downVote){
      this.project.score++;
      this.voteValue = VoteVal.noVote;
      const res = {
        "value": false,
        "method": "delete",
        "projectid": projectid
      }
      this.onVote(res);
    } else{
      this.project.score--;
      this.voteValue = VoteVal.downVote;
      const res = {
        "value": false,
        "method": "post",
        "projectid": projectid
      }
      this.onVote(res);
    }
  }

  onVote(res: {value: boolean, method: string, projectid: number}){
    const response = {
      "userid": this.auth.uid!,
      "projectid": res.projectid,
      "votevalue": res.value
    }
    if(res.method === "post"){
      this.userService.vote(response).subscribe(
        vote => console.log(vote),
        error => console.log(error)
      )
    }else if(res.method === "put"){
      this.userService.updateVote(response).subscribe(
        vote => console.log(vote),
        error => console.log(error)
      )
    } else {
      this.userService.deleteVote(response).subscribe(
        vote => console.log(vote),
        error => console.log(error)
      )
    }
  }
}
