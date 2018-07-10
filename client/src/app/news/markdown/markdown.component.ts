import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../service/index';
import {News} from '../../model/index';
import {first} from 'rxjs/operators';
import {NewsInfoDto} from "../../dto/newsInfoDto";

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit {
  @Input() news = new NewsInfoDto();
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
            (snapshot: NewsInfoDto) => {
              this.news = snapshot;
            }
          );
        }
      });
    this.news.post.id_user = this.authorId;
  }
}
