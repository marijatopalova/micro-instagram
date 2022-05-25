import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'posts'},
  {path: 'posts', component: PostsComponent},
  {path: 'post-details/:postId', component: PostDetailsComponent},
  {path: 'create-post', component: PostFormComponent},
  {path: 'edit-post/:postId', component: EditPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
