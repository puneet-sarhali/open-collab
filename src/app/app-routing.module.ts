import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./pages/home/post-list/post-list.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: 'kanban', loadChildren: () => import('./pages/kanban/kanban.module').then(m => m.KanbanModule)},
  { path: '',  component: PostListComponent },
  { path: '**',  component: AppComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
