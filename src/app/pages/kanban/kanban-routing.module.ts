import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KanbanComponent } from './kanban/kanban.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [

  { path: 'kanban', component: KanbanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
