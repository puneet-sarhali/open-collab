import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/core/mocks/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  postList: Post[];
  constructor(private ps: PostService) {
    this.postList = ps.getPostList();
  }

  ngOnInit(): void {
  }

}
