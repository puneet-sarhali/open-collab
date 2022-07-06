import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListComponent } from "./post-list/post-list.component";
import { SharedModule } from "../../shared/shared.module";
import { CreatePostComponent } from './create-post/create-post.component';


@NgModule({
  declarations: [
    PostListComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }
