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

import { PostComponent } from "./post/post.component";


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
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
    PostComponent
  ]
})
export class SharedModule { }
