import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { PostService } from "../../../core/http/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  postList!: Post[];
  constructor(private ps: PostService) {
    ps.getPosts().subscribe( res => {
      this.postList = res;
    });
  }

  ngOnInit(): void {

  }



}
