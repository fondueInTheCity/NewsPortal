import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import {News, User} from '../model';
import {NewsService, UserService} from '../service';
import {HttpClient} from '@angular/common/http';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    news: News[] = [];

    constructor(private userService: UserService,
                private newsService: NewsService) {
    }

    ngOnInit() {
      this.newsService.getNews().pipe(first()).subscribe(news => {
        this.news = news;
      });
    }

}
