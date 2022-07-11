import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { KanbanComponent } from './kanban/kanban.component';
import { SharedModule } from "../../shared/shared.module";
import { ProjectComponent } from './project/project.component';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    ProjectHeaderComponent,
    KanbanComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    DragDropModule,
    PanelModule,
    ToolbarModule
  ]
})
export class ProjectModule { }
