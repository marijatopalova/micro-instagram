import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  id: number = 0;
  post: Post = {
    albumId: 0,
    id: 0,
    title: '',
    url: '',
    thumbnailUrl: ''
  }

  constructor(
    private service: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];

    this.service.find(this.id).subscribe(data => {
      this.post = <Post>data;
    })
  }

  deletePost(id: number) {
    this.service.delete(id).subscribe(result => {
      if(confirm('Are you sure you want to delete this post?')){
        this.router.navigateByUrl('posts');
        this.showToastrSuccess()
      }
    })
  }

  showToastrSuccess() {
    this.notifyService.showSuccess('Post is successfully deleted!', 'Success')
  }

}
