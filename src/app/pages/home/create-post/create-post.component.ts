import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, Validator, Validators } from "@angular/forms";
import {ProjectService} from "../../../core/http/project.service";
import {Project} from "../../../shared/models/project";
import {AuthService} from "../../../core/auth/auth.service";
import {ToastService} from "../../../core/services/toast.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  display: boolean = false;
  @Output() newProject: EventEmitter<Project> = new EventEmitter<Project>()

  createPostForm = this.fb.group({
    projectName: ['', Validators.required],
    projectDescription: ['', Validators.required],
    tags: ['', Validators.required],
    github: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private ps: ProjectService, private auth: AuthService, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    // TODO: check uid state with if/else and navigate user to signIn
    const projectData: Project = {
      "projectid": -1,
      "projectname": this.createPostForm.value.projectName,
      "description": this.createPostForm.value.projectDescription,
      "score": 0,
      "upvotes": 0,
      "downvotes": 0,
      "createdat": new Date(),
      "userid": this.auth.uid!,
      "tag1": this.createPostForm.value.tags[0] != null ? this.createPostForm.value.tags[0].toLocaleLowerCase() : undefined,
      "tag2": this.createPostForm.value.tags[1] != null ? this.createPostForm.value.tags[1].toLocaleLowerCase() : undefined,
      "tag3": this.createPostForm.value.tags[2] != null ? this.createPostForm.value.tags[2].toLocaleLowerCase() : undefined,
      "github": this.createPostForm.value.github != null ? this.createPostForm.value.github : undefined,
    }

    this.ps.createProject(projectData).subscribe({
        next: (project) => {
          this.newProject.emit(projectData)
          this.toastService.projectCreated()
          this.display = false;
        },
        error: err => this.toastService.genericError("Error while publishing new project.")
      }
    )


  }

  showDialog(){
    this.display = true;
  }



}
