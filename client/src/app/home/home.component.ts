import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {NewsService, UserService} from '../service';
import {NewsInfoDto} from '../dto';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    news: NewsInfoDto[] = [];

    constructor(private userService: UserService,
                private newsService: NewsService) {}

    ngOnInit() {
      this.newsService.getNews().pipe(first()).subscribe(news => {
        this.news = news;
      });
    }

}
