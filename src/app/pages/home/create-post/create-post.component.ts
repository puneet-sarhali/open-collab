import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder } from "@angular/forms";
import {ProjectService} from "../../../core/http/project.service";
import {Project} from "../../../shared/models/project";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  display: boolean = false;
  @Output() newProject: EventEmitter<Project> = new EventEmitter<Project>()


  createPostForm = this.fb.group({
    projectName: [''],
    projectDescription: [''],
  });

  constructor(private fb: FormBuilder, private ps: ProjectService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    // TODO: check uid state with if/else and navigate user to signIn
    const projectData = {
      "projectid": -1,
      "projectname": this.createPostForm.value.projectName,
      "description": this.createPostForm.value.projectDescription,
      "score": 0,
      "upvotes": 0,
      "downvotes": 0,
      "createdat": new Date(),
      "userid": this.auth.uid!
    }
    this.ps.createProject(projectData).subscribe((res)=>{
      this.newProject.emit(projectData);
    })

  }
  showDialog(){
    this.display = true;
  }

}
