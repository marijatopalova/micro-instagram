import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url: string = 'https://jsonplaceholder.typicode.com/photos';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.url)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  find(id: number) {
    return this.http.get<Post>(this.url + '/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  create(post: Post) {
    return this.http.post(this.url, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, post: Post) {
    return this.http.put(this.url + '/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
