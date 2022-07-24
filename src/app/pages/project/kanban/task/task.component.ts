import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../shared/models/task';

import { KanbanService } from 'src/app/core/http/kanban.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private kanbanService: KanbanService) { };

  ngOnInit(): void {
  };

  deleteTask(id: any) {
    // console.log(id, "deleting=>");
    this.kanbanService.deleteTask(id).subscribe((task) => {

      // TODO: update so you don't have to refresh the page

    });
  }

  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>()

}
