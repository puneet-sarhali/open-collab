import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListComponent } from "./post-list/post-list.component";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }
