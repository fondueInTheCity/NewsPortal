import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import {News, User} from '../model';
import {NewsService, UserService} from '../service';
import {HttpClient} from '@angular/common/http';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    news: News[] = [];

    constructor(private userService: UserService,
                private newsService: NewsService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
      this.newsService.getNews().pipe(first()).subscribe(news => {
        this.news = news;
      });
    }

}
