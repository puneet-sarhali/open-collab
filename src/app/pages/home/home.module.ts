import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListComponent } from "./post-list/post-list.component";
import { SharedModule } from "../../shared/shared.module";
import { CreatePostComponent } from './create-post/create-post.component';
import { FilterPipe } from './post-list/filter.pipe';
import { MyProjectsComponent } from './my-projects/my-projects.component';



@NgModule({
    declarations: [
        PostListComponent,
        CreatePostComponent,
        FilterPipe,
        MyProjectsComponent,
    ],
    exports: [
        PostListComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class HomeModule { }
