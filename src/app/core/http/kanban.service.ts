import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Task } from "../../shared/models/task";

@Injectable({
  providedIn: 'root'
})
export class KanbanService{

  private url = "http://localhost:4999/tasks"
  //private url = "http://34.130.182.2/projects"
  constructor(private http: HttpClient) { }

  //
  getAllTasks(){
    return this.http.get<Task[]>(this.url);
  }

  createTask(task: Task){
    return this.http.post<Task[]>(this.url, task);
  } 

  getTask(taskid: number){
    return this.http.get<Task>(this.url + `/${taskid}`);
  }

  deleteTask(taskid:number){
    return this.http.delete<Task>(this.url + `/${taskid}`);
  }

}
