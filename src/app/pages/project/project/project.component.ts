import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {Project} from "../../../shared/models/project";
import {ProjectService} from "../../../core/http/project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project!: Project;
  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((param) => {
        return this.projectService.getProject(parseInt(param.get('id')!))
      })
    ).subscribe((project) => {
      this.project = project;
    })
  }

}
