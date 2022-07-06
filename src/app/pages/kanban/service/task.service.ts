import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task'


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // obtaining data from the .json files

  getDoneList() {
    return this.http.get<any>('assets/done.json')
      .toPromise()
      .then(res => <Task[]>res.data)
      .then(data => {
        return data;
      });
  }

  getInProgressList() {
    return this.http.get<any>('assets/in-progess.json')
      .toPromise()
      .then(res => <Task[]>res.data)
      .then(data => {
        return data;
      });
  }

  getToDoList() {
    return this.http.get<any>('assets/to-do.json')
      .toPromise()
      .then(res => <Task[]>res.data)
      .then(data => {
        return data;
      });
  }
}
