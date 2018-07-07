import {Component, OnInit, Input} from '@angular/core';
import {UserEditDto} from '../../../dto/userEditDto';
import { Router} from '@angular/router';
import {NewsService} from '../../../service';
import {News} from '../../../model';
import {first} from 'rxjs/internal/operators';

@Component({
  selector: 'app-profile-news',
  templateUrl: 'profile-news.component.html',
  styleUrls: ['profile-news.component.css']
})
export class ProfileNewsComponent implements OnInit {
  @Input() user: UserEditDto;
  news: News[] = [];
  constructor(private router: Router,
              private newsService: NewsService) { }

  ngOnInit() {
      this.loadAllNews();
  }

  isCanAddNews(): boolean {
    let currentUserJson = JSON.parse(localStorage.getItem('currentUser'));
    let isSelfAddNews: boolean = (((currentUserJson.userRole === 'ROLE_ADMIN') ||
    (currentUserJson.userRole === 'ROLE_WRITER')) && (this.user['username'] === currentUserJson.username));
    let isAdminPostsByOthers: boolean = ((currentUserJson.userRole === 'ROLE_ADMIN') &&
    (this.user['role'] === 'Writer'));
    return isSelfAddNews || isAdminPostsByOthers;
  }
  public deletePost(id: number) {
    this.newsService.deletePost(id).pipe(first()).subscribe(
      data => {
        this.loadAllNews();
        //this.router.navigate([`/`]);
      },
      error => {
        //sdfsdfefsd
      });
  }
  private loadAllNews() {
    this.newsService.getNewsByIdUser(this.user.id).pipe(first()).subscribe(news => {
      this.news = news;
    });
  }
}
