import {Injectable} from '@angular/core';
import {News} from '../model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommentAddDto} from '../dto';
import {CommentShowDto} from '../dto/CommentShowDto';

@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {}
  addPost(post: News) {
    return this.http.post(`${environment.serverUrl}news/addPost`, post);
  }
  getNews() {
    return this.http.get<News[]>(`${environment.serverUrl}news`);
  }
  getNewsByIdUser(idUser: number) {
    return this.http.get<News[]>(`${environment.serverUrl}news/author/` + idUser);
  }
  editPost(post: News) {
    return this.http.post(`${environment.serverUrl}news/edit`, post);
  }
  getPostById(id: number) {
    return this.http.get<News>(`${environment.serverUrl}news/` + id);
  }
  deletePost(id: number) {
    return this.http.delete(`${environment.serverUrl}news/deletePost/` + id);
  }
  addComment(commentAddDto: CommentAddDto) {
    return this.http.post(`${environment.serverUrl}news/comment`, commentAddDto);
  }
  showComments(idPost: number) {
    return this.http.get<CommentShowDto[]>(`${environment.serverUrl}news/comments/` + idPost);
  }
  addLike() {
  }
}
