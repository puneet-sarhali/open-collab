import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';


import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
//import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

import { KanbanComponent } from './kanban/kanban.component';
import { TaskComponent } from './task/task.component';

import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    KanbanComponent,
    TaskComponent

  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,

    // primeng modules
    ToolbarModule,
    CardModule,
    DragDropModule,
    PanelModule,
    //TableModule,
    ButtonModule,
    DialogModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KanbanModule { }


