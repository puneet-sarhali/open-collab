import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Project } from "../../shared/models/project";

interface patchedProject{
  projectname: string,
  description: string,
  tag1: string | undefined,
  tag2: string | undefined,
  tag3: string | undefined,
  github: string |  undefined
}


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = "http://localhost:4999/projects"
  // private url = "http://34.130.182.2/projects"
  constructor(private http: HttpClient) { }

  //
  getProjects(sort_by: string = "score"){
    return this.http.get<Project[]>(this.url + `?sort_by=${sort_by}`);
  }

  createProject(project: Project){
    return this.http.post<Project[]>(this.url, project);
  }

  getProject(projectid: number){
    return this.http.get<Project>(this.url + `/${projectid}`);
  }

  getMyProjects(userid: string){
    return this.http.get<Project[]>(this.url + `/users/${userid}`);
  }

  deleteProject(projectId: number){
    return this.http.delete(this.url + `/${projectId}`);
  }

  patchProject(projectId: number, data: patchedProject){
    return this.http.patch<patchedProject>(this.url + `/${projectId}`, data)
  }

}
