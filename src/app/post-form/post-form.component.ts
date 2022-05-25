import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    public service: PostService,
    private router: Router,
    private notifySevice: NotificationService) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.value);
    this.service.create(this.form.value).subscribe(res => {
      this.router.navigateByUrl('posts');
      this.showToastrSuccess();
    })
  }

  showToastrSuccess() {
    this.notifySevice.showSuccess('Post is successfully created!', 'Success')
  }

}
