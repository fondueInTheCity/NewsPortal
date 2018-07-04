import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../models';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../service';

@Component({
  selector: 'app-view-markdown',
  templateUrl: './view-markdown.component.html',
  styleUrls: ['./view-markdown.component.css']
})
export class ViewMarkdownComponent implements OnInit {
  @Input() news = new News();
  id: number;
  constructor(private route: ActivatedRoute,
              private newsService: NewsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.id = params['id'];
          const news = this.newsService.getPostById(this.id);
          news.subscribe(
            (snapshot) => {
              this.news = snapshot;
            }
          );
        }
      });
  }

}
