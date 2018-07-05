import {Injectable} from '@angular/core';
import {News} from '../models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {}
  addPost(post: News) {
    return this.http.post(`${environment.serverUrl}news/addPost`, post);
  }
  getNews(id: number) {
    return this.http.get<News>(`${environment.serverUrl}news/post/` + id);
  }
  getAll() {
    return this.http.get<News[]>(`${environment.serverUrl}news`);
  }
  getAllById(id: number) {
    return this.http.get<News[]>(`${environment.serverUrl}news/author/` + id);
  }
  editNews(id: number, post: News) {
    return this.http.post(`${environment.serverUrl}news/post/` + id, post);
  }
  getPostById(id: number) {
    return this.http.get<News>(`${environment.serverUrl}news/` + id);
  }
}
