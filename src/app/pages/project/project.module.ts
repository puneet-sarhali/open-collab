import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { TaskDialogComponent } from "./kanban/task-dialog/task-dialog.component";
import { TaskComponent } from "./kanban/task/task.component";

import { SharedModule } from "../../shared/shared.module";
import { ProjectComponent } from './project/project.component';
import {KanbanComponent} from "./kanban/kanban.component";



@NgModule({
    declarations: [
      ProjectHeaderComponent,
      ProjectComponent,
      TaskDialogComponent,
      TaskComponent,
      KanbanComponent
    ],
    exports: [

    ],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        SharedModule,
    ]
})
export class ProjectModule { }
