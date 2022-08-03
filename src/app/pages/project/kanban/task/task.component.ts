import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Task } from '../../../../shared/models/task';
import { User } from '../../../../shared/models/user';

import { KanbanService } from 'src/app/core/http/kanban.service';
import { UserService } from 'src/app/core/http/user.service';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "../../../../core/auth/auth.service";
import {ProjectService} from "../../../../core/http/project.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../../../shared/models/project";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges {

  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  @Output() deleteEvent = new EventEmitter<string>();
  users: User[] = [];
  assignedUser: User | undefined;
  userName!: string | null;
  isAdmin$!: BehaviorSubject<boolean>;
  uid!: BehaviorSubject<string>;
  isLoggedIn$!: BehaviorSubject<boolean>;
  project!: Observable<Project>;

  constructor(private kanbanService: KanbanService,
              private userService: UserService,
              private auth: AuthService,
              private projectService: ProjectService,
              private route: ActivatedRoute)  {
    this.isAdmin$ = this.auth.isAdmin$;
    this.uid = this.auth.userId$;
    this.isLoggedIn$ = this.auth.isLoggedIn$;


    this.project = this.route.paramMap.pipe(
      switchMap((param) => {
        return this.projectService.getProject(parseInt(param.get('id')!))
      })
    )
  };




  ngOnInit(): void {
    this.fetchUsers();
    //this.fetchTasks();
  };
  ngOnChanges(changes: SimpleChanges) {
    if(this.task){
      this.getName(this.task.assignedto);
    }

  }
  getName(uid: string ){
      this.userService.getUser(uid).subscribe(res =>{
        if(res){
          this.userName = res.name;
        }
      })
  }

  getPlaceholder(){
    if(this.userName){
      return this.userName;
    }else{
      return "Not Assigned"
    }
  }

  deleteTask(id: any) {
    this.kanbanService.deleteTask(id).subscribe((task) => {
    this.deleteEvent.emit(); // so that the page updates without refreshing
    });
  }


  fetchUsers() {
    this.userService.getUsers().subscribe((user) => {
      this.users = user;
    })
  }

  // updating the task with assigned user
  updateTask(task: Task) {
    this.kanbanService.updateTask({
      category: task.category, assignedto: this.assignedUser?.id
    }, task.taskid).subscribe((res) => {
       this.deleteEvent.emit();
       if(res.assignedto){
         this.getName(res.assignedto)
       }

    })
  }


}
