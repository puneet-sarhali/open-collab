import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Project } from 'src/app/shared/models/project';
import { ProjectService } from "../../../core/http/project.service";
import {User} from "../../../shared/models/user";
import {AuthService} from "../../../core/auth/auth.service";
import {UserService} from "../../../core/http/user.service";
import {combineLatest, mergeMap, Observable, of, switchMap, toArray} from "rxjs";
import {Vote} from "../../../shared/models/vote";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  inputData!: Project[];
  myProjects!: Project[];
  searchValue!: string;
  sortOptions = [
    {label: 'Top', value: "score", icon: "pi pi-chart-line"},
    {label: 'New', value: "createdat", icon: "pi pi-bell"}
  ];
  sortValue: string = "score";

  @Input() newProject!: Project;
  constructor(private ps: ProjectService, private userService: UserService, private auth: AuthService) {
    //gets all projects and then gets the user data associated with it.
    this.getData()
    this.getMyProjects();
  }
  //every time new project is added
  addItem(project: Project){
    this.getData()
    this.getMyProjects()
  }

  onSortChange(){
    this.getData(this.sortValue);
  }

  tagClicked(value: string){
    this.searchValue = value;
    console.log(this.searchValue)
  }

  getMyProjects(){
    this.auth.userInfo().pipe(
      switchMap((user) => this.ps.getMyProjects(user?.uid!))
    ).subscribe((myProjects) =>{
      this.myProjects = myProjects;
    })
  }

  getData(sort_by: string = "score"){
    this.ps.getProjects(sort_by).subscribe({
      next: value => this.inputData = value
    })
  }



  //votes made by current user
  getVotes(){
    return this.auth.userInfo().pipe(
      switchMap((user) => this.userService.getVotes(user?.uid!))
    )
  }

  ngOnInit(): void {

  }




}
