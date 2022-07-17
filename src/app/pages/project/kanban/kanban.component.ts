import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';


// import { TaskService } from '../service/task.service';
import  { Task } from "../project/task";
import { DialogModule } from 'primeng/dialog';
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';

import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})

export class KanbanComponent {

  todo: Task[] = [
    {
      id: "5",
      title: 'Do Something',
      description: 'This is the description'
    },
    {
      id: "6",
      title: 'Create a Task',
      description: 'yay!'
    }
  ];

  inProgress: Task[] = [
  ];

  done: Task[] = [
  ];

  constructor(private dialog: MatDialog) {}

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '40%',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
      if (!result) {
        return;
      }
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
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
  }

  displayDialog: boolean = false;

  newTask(): void {
    // this.displayDialog = true;

    // open the dialogue window
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '50%',
      data: {
        task: {},
      },
    });

    // on close of dialogue, save the info onto todo
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.todo.push(result.task);
      });
    }
 }

// assign tasks
// in the todo users can select an item and they can request to contribute to it
// if time: manager can assign people to tasks
