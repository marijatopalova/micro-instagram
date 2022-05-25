import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.service.getPosts().subscribe(data => {
      this.posts = data;
      console.log(this.posts)
    })
  }

}
