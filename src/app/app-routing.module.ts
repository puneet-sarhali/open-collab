import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./pages/home/post-list/post-list.component";
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";
import {CreatePostComponent} from "./pages/home/create-post/create-post.component";

const routes: Routes = [
  { path: 'posts/create-post',  component: CreatePostComponent, pathMatch: 'full' },
  { path: 'project/:id', loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule)},
  { path: 'posts',  component: PostListComponent, pathMatch: 'full' },
  { path: '', redirectTo:'/posts', pathMatch: 'full' },
  { path: '**',  component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
