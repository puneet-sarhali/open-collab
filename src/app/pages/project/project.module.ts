import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { ProjectKanbanComponent } from './project-kanban/project-kanban.component';


@NgModule({
  declarations: [
    ProjectHeaderComponent,
    ProjectKanbanComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
