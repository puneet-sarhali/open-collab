import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../shared/models/task';

import { KanbanService } from 'src/app/core/http/kanban.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private kanbanService: KanbanService, ) { };

  ngOnInit(): void {
    
  };

  deleteTask(id: any) {
    this.kanbanService.deleteTask(id).subscribe((task) => {
    this.deleteEvent.emit(); // so that the page updates without refreshing
    });
  }

  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  @Output() deleteEvent = new EventEmitter<string>();

}
