import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Project } from 'src/app/shared/models/project';
import { ProjectService } from "../../../core/http/project.service";
import {User} from "../../../shared/models/user";
import {AuthService} from "../../../core/auth/auth.service";
import {UserService} from "../../../core/http/user.service";
import {combineLatest, mergeMap, of, switchMap, toArray} from "rxjs";
import {Vote} from "../../../shared/models/vote";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  inputData!: [Project, User][];
  users!: User[];

  @Input() newProject!: Project;
  constructor(private ps: ProjectService, private userService: UserService, private auth: AuthService) {
    //gets all projects and then gets the user data associated with it.
    this.getData()

  }

  getData(){
    this.ps.getProjects().pipe(
      mergeMap((projects) => of(...projects)),
      mergeMap((project) =>  {
        return combineLatest(of(project), this.userService.getUser(project.userid!))
      }),
      toArray()
    ).subscribe((value) => this.inputData = value);
  }

  addItem(project: Project){
    this.getData()
  }

  //votes made by current user
  getVotes(){
    return this.auth.userInfo().pipe(
      switchMap((user) => this.userService.getVotes(user?.uid!))
    )
  }

  ngOnInit(): void {

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
