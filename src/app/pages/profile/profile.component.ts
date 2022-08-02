import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../shared/models/project";
import {ProjectService} from "../../core/http/project.service";
import {UserService} from "../../core/http/user.service";
import {AuthService} from "../../core/auth/auth.service";
import { KanbanService } from 'src/app/core/http/kanban.service';
import { Task } from "../../shared/models/task";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data!: Project[];
  tasks: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private auth: AuthService,
    private kanbanService: KanbanService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((param) => {
        return this.projectService.getMyProjects(param.get('id')!)
      })
    ).subscribe((project) => {
      this.data = project;
    })
    this.getTasks();
  }

  //votes made by current user
  getVotes(){
    return this.auth.userInfo().pipe(
      switchMap((user) => this.userService.getVotes(user?.uid!))
    )
  }

  getTasks() {
    this.kanbanService.getAllTasks().subscribe((task) => {
      let userID = this.route.snapshot.paramMap.get('id');
      this.tasks = task;
      this.tasks = this.tasks.filter(t =>
        t.assignedto === userID
      );

      console.log("userid", userID);
    })
  }

}
