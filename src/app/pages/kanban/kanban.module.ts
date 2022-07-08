import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';

import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Button, ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

import { KanbanComponent } from './kanban/kanban.component';
import { TaskComponent } from './task/task.component';





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
    TableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KanbanModule { }


