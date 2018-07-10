import {Injectable} from '@angular/core';
import {News} from '../model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommentAddDto, LikeDto} from '../dto';
import {CommentShowDto} from '../dto/CommentShowDto';
import {b} from '@angular/core/src/render3';
import {Headers} from "@angular/http";
import {HttpHeaders} from "@angular/common/http";
import {NewsInfoDto} from "../dto/newsInfoDto";

@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {}
  addPost(post: NewsInfoDto) {
    return this.http.post(`${environment.serverUrl}news/addPost`, post);
  }
  getNews() {
    return this.http.get<NewsInfoDto[]>(`${environment.serverUrl}news`);
  }
  getNewsByIdUser(idUser: number) {
    return this.http.get<News[]>(`${environment.serverUrl}news/author/` + idUser);
  }
  editPost(post: NewsInfoDto) {
    return this.http.post(`${environment.serverUrl}news/edit`, post);
  }
  getPostById(id: number) {
    return this.http.get<NewsInfoDto>(`${environment.serverUrl}news/` + id);
  }
  addImageToPost(image: FormData) {
    // let headers = new Headers();
    // headers.set('responseType', 'text');
    // let headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<string>(`${environment.serverUrl}news/addImageToPost`, image);
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
  sortByName(news: NewsInfoDto[], sortType: number): NewsInfoDto[] {
    return news.sort(function (a: NewsInfoDto, c: NewsInfoDto): number  {
      return sortType * (a.post.name > c.post.name ? 1 : -1);
    });
  }
  sortByDate(news: NewsInfoDto[], sortType: number): NewsInfoDto[] {
    return news.sort(function (a: NewsInfoDto, c: NewsInfoDto): number  {
      return sortType * (a.post.publishDate.toLowerCase() > c.post.publishDate.toLowerCase() ? 1 : -1);
    });
  }
  searchByFragment(news: NewsInfoDto[], fragment: string): NewsInfoDto[] {
    let ans: NewsInfoDto[] = [];
    news.forEach(function (post: NewsInfoDto) {
      if (post.post.name.toLowerCase().includes(fragment.toLowerCase())
        || post.post.text.toLowerCase().includes(fragment.toLowerCase())) {
        ans.push(post);
      }
    });
    return ans;
  }
  addLike(likeDto: LikeDto) {
    return this.http.post(`${environment.serverUrl}news/addLike`, likeDto);
  }
  sortComments(commentsShowDto: CommentShowDto[]) {
    return commentsShowDto.sort(function (a: CommentShowDto, c: CommentShowDto): number {
      return (a.publish_date > c.publish_date ? 1 : -1);
    });
  }
}
