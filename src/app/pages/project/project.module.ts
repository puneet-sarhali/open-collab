import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { TaskDialogComponent } from "./kanban/task-dialog/task-dialog.component";
import { TaskComponent } from "./kanban/task/task.component";

import { SharedModule } from "../../shared/shared.module";
import { ProjectComponent } from './project/project.component';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { KanbanComponent } from "./kanban/kanban.component";
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';


@NgModule({
  declarations: [
    ProjectHeaderComponent,
    KanbanComponent,
    ProjectComponent,
    TaskDialogComponent,
    TaskComponent,
    CommentsComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    DragDropModule,
    PanelModule,
    ToolbarModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
  ]
})
export class ProjectModule { }
