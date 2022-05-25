import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  id = 0;

  post: Post = {
    albumId: 0,
    id: 0,
    title: '',
    url: '',
    thumbnailUrl: ''
  }

  form: FormGroup;

  constructor(
    private service: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) { 
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      albumId: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];

    this.service.find(this.id).subscribe(data => {
      this.post = <Post>data,
      this.populateTitleAndAlbumId(data.title, data.albumId)
    });
  }

  update() {
    console.log(this.form.value);
    this.service.update(this.id, this.form.value).subscribe(res => {
      this.router.navigateByUrl('posts');
      this.showToastrSuccess();
    })
  }

  populateTitleAndAlbumId(title: string, albumId: number) {
    this.form.patchValue({
      title: title,
      albumId: albumId
    })
  }

  showToastrSuccess() {
    this.notifyService.showSuccess('Post is successfully updated!', 'Success')
  }

}
