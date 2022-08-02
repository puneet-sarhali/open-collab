import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../shared/models/task';
import { User } from '../../../../shared/models/user';

import { KanbanService } from 'src/app/core/http/kanban.service';
import { UserService } from 'src/app/core/http/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private kanbanService: KanbanService, private userService: UserService) { };

  users: User[] = [];
  tasks: Task[] = [];
  assignedUser: User | undefined;
  assignedName!: string | null;

  ngOnInit(): void {
    this.fetchUsers();
    //this.fetchTasks();
    
  };

  deleteTask(id: any) {
    this.kanbanService.deleteTask(id).subscribe((task) => {
    this.deleteEvent.emit(); // so that the page updates without refreshing
    });
  }

  fetchTasks() {
    this.kanbanService.getAllTasks().subscribe((task) => {
      this.tasks = task;
    })
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
      // this.getUserName(task.assignedto);
      
    })
    
    //this.getUserName(this.assignedUser?.id)

  }

  getUserName(id: string) {
    this.userService.getUser(id).subscribe((user) => {
      console.log(user.name, "user");
      this.assignedName = user.name;
    })
  }



  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  @Output() deleteEvent = new EventEmitter<string>();

}
