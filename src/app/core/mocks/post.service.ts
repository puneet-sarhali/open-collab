import { Injectable } from '@angular/core';
import { Post, ProjectState } from 'src/app/shared/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postList: Post[] = [
    {
      postid: "1",
      projectName: "Open Collab",
      description: "A collaboration tool for open source developers to propose new project ideas, collaborate with developers interested in your proposal and transparently keep track of the project’s progress.",
      score: 26,
    },
    {
      postid: "2",
      projectName: "Weather API",
      description: "A collaboration tool for open source developers to propose new project ideas, collaborate with developers interested in your proposal and transparently keep track of the project’s progress.",
      score: 45,
    },
    {
      postid: "3",
      projectName: "Angular UI Library",
      description: "A collaboration tool for open source developers to propose new project ideas, collaborate with developers interested in your proposal and transparently keep track of the project’s progress.",
      score: 97,
    }
  ]

  getPostList(){
    return this.postList;
  }
  constructor() { }
}
