import { Component, OnInit, Inject, EventEmitter, Output, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from "../../../../shared/models/task";

import { FormControl, FormGroup, FormBuilder, Form } from '@angular/forms';
import { Validators } from '@angular/forms';

import {AuthService} from "../../../../core/auth/auth.service";

import { KanbanService } from 'src/app/core/http/kanban.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  private backupTask: Partial<Task> = { ...this.data.task };
  errormsg: any;
  taskForm: any;

  @Output() newTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private kanbanService: KanbanService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    let projID = this.route.firstChild?.snapshot.paramMap.get('id');

    this.taskForm = new FormGroup({
      'title': new FormControl('', Validators.required), // Validators.require -> ensure the title isn't blank
      'content': new FormControl(''),
      'category': new FormControl(0),
      'taskid': new FormControl(Math.floor(Math.random() * 100000)), //TODO: find better way to generate the ids?
      'projectid': new FormControl(projID)
    });
  }

  taskSubmit() {
    
    if (this.taskForm.valid) { // ensuring the title input isn't empty  
      this.kanbanService
        .createTask(this.taskForm.value).subscribe(
          (task) => {
            this.taskForm.reset();
          }
        )
    } else {
      this.errormsg = "You must input a title!";
    }

    this.dialogRef.close(this.taskForm.value);
  }

  cancel(): void {

    this.dialogRef.close();
  }
}

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}

