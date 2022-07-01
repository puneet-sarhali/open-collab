import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostComponent } from "./post-list/post/post.component";

import { HomeRoutingModule } from './home-routing.module';
import { TagModule } from 'primeng/tag';
import { DividerModule } from "primeng/divider";



@NgModule({
  declarations: [HomeComponent, PostListComponent, PostComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TagModule,
    DividerModule
  ]
})
export class HomeModule { }
