import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./pages/home/post-list/post-list.component";
import {AppComponent} from "./app.component";

import { CommentsComponent } from './pages/comments/comments.component';
import { CommentDetailComponent } from './pages/comment-detail/comment-detail.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'kanban', loadChildren: () => import('./pages/kanban/kanban.module').then(m => m.KanbanModule)},
  { path: '',  component: PostListComponent }, 
  { path: '**',  component: AppComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'dashboard', component: DashboardComponent },
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'index.html', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: CommentDetailComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }