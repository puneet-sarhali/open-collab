import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../shared/models/project";


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {
  @Input() myProjects!: Project[];
  constructor( ) { }

  ngOnInit(): void {
  }

}
