import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { Task } from '../../../shared/models/task'
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { KanbanService } from "../../../core/http/kanban.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})

export class KanbanComponent implements OnInit {

  tasks: Task[] = [];

  todo: Task[] = [];

  inProgress: Task[] = [];

  done: Task[] = [];

  projID: string | null | undefined;
  
  constructor(
    private dialog: MatDialog,
    private kanbanService: KanbanService,
    private route: ActivatedRoute,) { }
  ngOnInit() {

    this.fetchData();
  }

  fetchData(): void {
    console.log("got here");
    this.kanbanService
      .getAllTasks(
    ).subscribe((task) => {
      console.log(task, "ALL TASK");
      this.projID = this.route.snapshot.paramMap.get('id');

      this.tasks = task;

      // filter to only have the tasks from THIS PROJECT
      this.tasks = this.tasks.filter(item =>
        parseInt(item.projectid) === parseInt(this.projID!)
      );

      // filter each of the 3 categories
      this.todo = this.tasks.filter(item =>
        item.category === 0
      );

      this.inProgress = this.tasks.filter(item =>
        item.category === 1
      );

      this.done = this.tasks.filter(item =>
        item.category === 2
      );
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // saving the new category to db
    let currCategory = 0;

    for (let t of event.container.data) {
      if (event.container.id === "todo") {
        currCategory = 0;
      } else if (event.container.id === "inProgress") { 
        currCategory = 1;
      } else { 
        currCategory = 2;
      }

      if (t.category !== currCategory) {
        // updating the moved task
        this.kanbanService.updateTask({ category: currCategory, assignedto: t.assignedto }, t.taskid).subscribe(res => {
          // console.log("res updated =>", res);
        });
      }
    }
  }

  displayDialog: boolean = false;

  recieveDelete(): void {
    this.fetchData();
  }

  newTask(): void {
    // open the dialogue window
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '50%',
      data: {
        task: {},
      },
    });

    // update the displayed tasks right after close 
    dialogRef.afterClosed().subscribe(result => {
      this.todo.push(result);
    })
  }
}

// run with npm start for backend
// run front with ng serve