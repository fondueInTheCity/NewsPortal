import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../service';
import {News} from '../models';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit {
  @Input() news = new News();
  public new = true;
  private id: number;
  public authorId: number;
  constructor(private route: ActivatedRoute,
              private newsService: NewsService) {}
  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.authorId = params['authorId'];
        if (params.hasOwnProperty('id')) {
          this.id = params['id'];
          this.new = false;
          const news = this.newsService.getPostById(this.id);
          news.subscribe(
            (snapshot) => {
              this.news = snapshot;
            }
          );
        }
      });
    this.news.id_user = this.authorId;
  }
}
