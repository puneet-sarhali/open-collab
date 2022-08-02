import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import { ToolbarModule } from "primeng/toolbar";
import { SelectButtonModule } from 'primeng/selectbutton';
import {StepsModule} from 'primeng/steps';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import { ToastModule } from "primeng/toast";

import { PanelModule } from 'primeng/panel';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from "@angular/material/toolbar";
import { TableModule } from "primeng/table";


import { FormsModule ,ReactiveFormsModule } from "@angular/forms";

import { PostComponent } from "./post/post.component";
import { RouterModule } from "@angular/router";

import {TimeSincePipe} from "./pipes/time-since.pipe";


@NgModule({
  declarations: [
    PostComponent,
    TimeSincePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
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
    TagModule,
    ChipModule,
    DividerModule,
    DialogModule,
    ChipsModule,
    ReactiveFormsModule
  ],
  exports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    MenuModule,
    DividerModule,
    OverlayPanelModule,
    TagModule,
    PostComponent,
    ReactiveFormsModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    ToolbarModule,
    SelectButtonModule,
    StepsModule,
    ChipsModule,
    DragDropModule,
    PanelModule,
    ToolbarModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    ToastModule,
    TableModule,
    TimeSincePipe

  ]
})
export class SharedModule { }
