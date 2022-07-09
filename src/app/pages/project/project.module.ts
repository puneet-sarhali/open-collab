import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { ProjectKanbanComponent } from './project-kanban/project-kanban.component';
import { SharedModule } from "../../shared/shared.module";
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    ProjectHeaderComponent,
    ProjectKanbanComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ]
})
export class ProjectModule { }
