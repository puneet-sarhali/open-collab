import { Component, OnInit } from '@angular/core';

interface Task{
  id: string,
  title: string,
  description: string
}

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  inProgressTasks: Task[] = [
    {
      id: "3",
      title: 'Do Something',
      description: 'This is the description'
    },
    {
      id: "4",
      title: 'Create a Task',
      description: 'yay!'
    }
  ];

  doneTasks: Task[] = [
    {
      id: "1",
      title: 'Running',
      description: 'go fast :D'
    },
    {
      id: "2",
      title: 'finish homework',
      description: 'lots to do...'
    }
  ];;

  draggedTask!: Task | null;

  displayDialog: boolean = false;

  constructor() { }


  ngOnInit(): void { }
  //   this.taskService.getInProgressList().then(tasks => this.inProgressTasks = tasks);
  //   this.taskService.getDoneList().then(tasks => this.doneTasks = tasks);
  //   console.log(this.doneTasks);
  // }

  dragStart(event: any, task: Task) {
        this.draggedTask = task;
  }

  // allow inProgressTasks to be dropped into doneTasks
  dropToDone(event: any, dropped:Task[]) {
        if (this.draggedTask) {
            let draggedTaskIndex = this.findIndexInProgress(this.draggedTask);
            this.doneTasks = [...this.doneTasks, this.draggedTask];
            this.inProgressTasks = this.inProgressTasks.filter((val, i) => i != draggedTaskIndex);
            this.draggedTask = null;
        }
  }
//TODO: implement with array
  // allow doneTasks to be dropped into inProgressTasks
  dropToInProgress(event: any, dropped:Task[]) {
        if (this.draggedTask) {
            let draggedTaskIndex = this.findIndexDone(this.draggedTask);
            this.inProgressTasks = [...this.inProgressTasks, this.draggedTask];
            this.doneTasks = this.doneTasks.filter((val, i) => i != draggedTaskIndex);
            this.draggedTask = null;
        }
  }

  dragEnd(event: any) {
        this.draggedTask = null;
  }

  findIndexInProgress(task: Task) {
      let index = -1;
      for (let i = 0; i < this.inProgressTasks.length; i++) {
          if (task.id === this.inProgressTasks[i].id) {
              index = i;
              break;
          }
      }
      return index;
  }
  findIndexDone(task: Task) {
      let index = -1;
      for (let i = 0; i < this.doneTasks.length; i++) {
          if (task.id === this.doneTasks[i].id) {
              index = i;
              break;
          }
      }
      return index;
  }

  newTask(): void {
    this.displayDialog = true;

    //TODO: add saving and taking inputs for the new taks
  }

}

//assign tasks
// in the todo users can select an item and they can request to contribute to it
// if time: manager can assign people to tasks
