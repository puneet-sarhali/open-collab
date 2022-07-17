import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';

// primeng imports
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
//import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

// material imports
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



import { KanbanComponent } from './kanban/kanban.component';
import { TaskComponent } from './task/task.component';

import { SharedModule } from "../../shared/shared.module";
import { TaskDialogComponent } from './task-dialog/task-dialog.component';


@NgModule({
  declarations: [
    KanbanComponent,
    TaskComponent,
    TaskDialogComponent

  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,

    // primeng modules
    ToolbarModule,
    CardModule,
    //DragDropModule,
    PanelModule,
    ButtonModule,
    DialogModule,
    SharedModule,

    // material modules
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KanbanModule { }


