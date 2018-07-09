import {Injectable} from '@angular/core';
import {News} from '../model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommentAddDto} from '../dto';
import {CommentShowDto} from '../dto/CommentShowDto';
import {b} from '@angular/core/src/render3';

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
  sortByName(news: News[], sortType: number): News[] {
    return news.sort(function (a: News, c: News): number  {
      return sortType * (a.name > c.name ? 1 : -1);
    });
  }
  sortByDate(news: News[], sortType: number): News[] {
    return news.sort(function (a: News, c: News): number  {
      return sortType * (a.publishDate.toLowerCase() > c.publishDate.toLowerCase() ? 1 : -1);
    });
  }
  searchByFragment(news: News[], fragment: string): News[] {
    let ans: News[] = [];
    news.forEach(function (post: News) {
      if (post.name.toLowerCase().includes(fragment.toLowerCase())
        || post.text.toLowerCase().includes(fragment.toLowerCase())) {
        ans.push(post);
      }
    });
    return ans;
  }
}
