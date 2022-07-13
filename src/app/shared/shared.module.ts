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
import {ChipsModule} from 'primeng/chips';

import { FormsModule ,ReactiveFormsModule } from "@angular/forms";

import { PostComponent } from "./post/post.component";
import { RouterModule } from "@angular/router";

import {TimeSincePipe} from "./pipes/time-since.pipe";


@NgModule({
  declarations: [
    PostComponent,
    TimeSincePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule
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
    ChipsModule

  ]
})
export class SharedModule { }
