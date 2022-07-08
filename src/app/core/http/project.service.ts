import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Project } from "../../shared/models/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = "http://localhost:4999/projects"
  constructor(private http: HttpClient) { }

  //
  getProjects(){
    return this.http.get<Project[]>(this.url);
  }

  createProject(project: Project){
    return this.http.post<Project[]>(this.url, project);
  }

}
