import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../shared/models/project";
import {switchMap} from "rxjs";
import {AuthService} from "../../../core/auth/auth.service";
import {UserService} from "../../../core/http/user.service";


@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent implements OnInit {
  @Input() project!: Project;

  constructor(private auth: AuthService, private userService:UserService) {

  }

  ngOnInit(): void {
  }
  getVotes(){
    return this.auth.userInfo().pipe(
      switchMap((user) => this.userService.getVotes(user?.uid!))
    )
  }

}
