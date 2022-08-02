import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Project } from 'src/app/shared/models/project';
import {Vote} from "../models/vote";
import {BehaviorSubject, Observable} from "rxjs";
import {ProjectService} from "../../core/http/project.service";
import {UserService} from "../../core/http/user.service";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "../../core/services/toast.service";
import { FormBuilder } from "@angular/forms";

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
export class PostComponent implements OnInit{
  @Input() project!: Project;
  @Input()  currentUserVotes!: Observable<Vote[]>;
  @Input() fromProject: boolean = false;
  @Output() tagSearchValue: EventEmitter<string> = new EventEmitter<string>();
  voteValue: VoteVal = VoteVal.noVote;
  displayEditDialog = false;
  currentUid!: string | undefined;
  hideEdit = true;
  isAdmin$!: BehaviorSubject<boolean>;
  isLoggedIn$!: BehaviorSubject<boolean>;

  updateProjectForm = this.fb.group({
    projectName: [''],
    projectDescription: [''],
    tags: [''],
    github: ['']
  });


  constructor(private ps: ProjectService,
              private userService: UserService,
              private auth: AuthService,
              private router: Router,
              private toastService: ToastService,
              private fb: FormBuilder) {

      this.auth.userInfo().subscribe((info) => this.currentUid = info?.uid)
      this.isAdmin$ = this.auth.isAdmin$;
      this.isLoggedIn$ = this.auth.isLoggedIn$;

  }

  ngOnInit(): void {
    this.currentUserVotes.subscribe((votes) => {
      votes.forEach((vote) => {
        if (vote.projectid === this.project.projectid) {
          if (vote.votevalue) {
            this.voteValue = VoteVal.upVote;
          } else {
            this.voteValue = VoteVal.downVote;
          }
        }
      })
    })
  }



  onDelete(pid: number){
    this.ps.deleteProject(pid).subscribe({
      next: value => {
        this.toastService.projectDeleted();
        this.router.navigate(['posts'])
      },
      error: err => console.log("error delete project")
    })
  }

  onTagClick(value: string){
    this.tagSearchValue.emit(value)
  }

  onUpvote(projectid: number){
    let method = "get";
    let res = {
      "value": true,
      "method": method,
      "projectid": projectid,
      "score": 0,
      "votevalue": VoteVal.noVote
    }

    if(this.voteValue === VoteVal.downVote){
      res.score = 2;
      res.votevalue = VoteVal.upVote;
      res.method = "put"
    } else if(this.voteValue === VoteVal.upVote){
      res.score = -1;
      res.votevalue = VoteVal.noVote;
      res.method = "delete"
    } else{
      res.score = 1;
      res.votevalue = VoteVal.upVote;
      res.method = "post"
    }
    this.onVote(res);
  }
  onDownvote(projectid: number){
    let method = "get";
    let res = {
      "value": false,
      "method": method,
      "projectid": projectid,
      "score": 0,
      "votevalue": VoteVal.noVote
    }
    if(this.voteValue === VoteVal.upVote){
      res.score = -2
      res.votevalue = VoteVal.downVote;
      res.method = "put"
    } else if(this.voteValue === VoteVal.downVote){
      res.score = 1;
      res.votevalue = VoteVal.noVote;
      res.method = "delete"
    } else{
      res.score = -1;
      res.votevalue = VoteVal.downVote;
      res.method = "post"
    }
    this.onVote(res);
  }

  updateVotesView(res: {value: boolean, method: string, projectid: number, score: number, votevalue: VoteVal}){
      this.project.score += res.score;
      this.voteValue = res.votevalue;
  }

  onVote(res: {value: boolean, method: string, projectid: number, score: number, votevalue: VoteVal}){
    const response = {
      "userid": this.auth.uid!,
      "projectid": res.projectid,
      "votevalue": res.value
    }
    if(res.method === "post"){
      this.userService.vote(response).subscribe(
        vote => this.updateVotesView(res)
      )
    }else if(res.method === "put"){
      this.userService.updateVote(response).subscribe(
        vote => this.updateVotesView(res)
      )
    } else {
      this.userService.deleteVote(response).subscribe(
        vote => this.updateVotesView(res)
      )
    }
  }

  onCancel(){
    this.updateProjectForm.setValue({
      projectName: [''],
      projectDescription: [''],
      tags: [''],
      github: ['']
    })
    this.hideEdit = true;
  }

  onUpdate(){
    const data = {
      "projectname": this.updateProjectForm.value.projectName,
      "description": this.updateProjectForm.value.projectDescription,
      "tag1": this.updateProjectForm.value.tags[0] != null ? this.updateProjectForm.value.tags[0].toLocaleLowerCase() : undefined,
      "tag2": this.updateProjectForm.value.tags[1] != null ? this.updateProjectForm.value.tags[1].toLocaleLowerCase() : undefined,
      "tag3": this.updateProjectForm.value.tags[2] != null ? this.updateProjectForm.value.tags[2].toLocaleLowerCase() : undefined,
      "github": this.updateProjectForm.value.github != null ? this.updateProjectForm.value.github : undefined,
    }

    this.ps.patchProject(this.project.projectid, data).subscribe({
      next: data => {
        this.toastService.genericSuccess()
        this.project.projectname = data.projectname
        this.project.description = data.description
        this.project.tag1 = data.tag1
        this.project.tag2 = data.tag2
        this.project.tag3 = data.tag3
        this.project.github = data.github
      },
      error: err => this.toastService.genericError()
    })

    this.hideEdit = true;
  }

  onEdit(){
    let tags = [];
    if(this.project.tag1){
      tags.push(this.project.tag1)
    }
    if(this.project.tag2){
      tags.push(this.project.tag2)
    }
    if(this.project.tag3){
      tags.push(this.project.tag3)
    }
    this.hideEdit = !this.hideEdit;
    this.displayEditDialog = true;
    this.updateProjectForm.setValue({
      projectName: this.project.projectname,
      projectDescription: this.project.description,
      tags: tags,
      github: this.project.github
    })
  }


}
