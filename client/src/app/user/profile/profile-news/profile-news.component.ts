import {Component, OnInit, Input} from '@angular/core';
import {User} from '../../../models';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../../service';
import {News} from '../../../models';
import {first} from 'rxjs/internal/operators';

@Component({
  selector: 'app-profile-news',
  templateUrl: 'profile-news.component.html',
  styleUrls: ['profile-news.component.css']
})
export class ProfileNewsComponent implements OnInit {
  @Input() user: User;
  news: News[] = [];
  constructor(private router: Router,
              private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getAllById(this.user.id).pipe(first()).subscribe(news => {
    this.news = news;
  });
  }
}
