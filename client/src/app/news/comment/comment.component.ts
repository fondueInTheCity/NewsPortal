import {Component, Input, OnInit} from '@angular/core';
import {CommentShowDto} from '../../dto/index';
import {first} from 'rxjs/internal/operators';
import {NewsService} from '../../service/index';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() idNews: number;
  commentsShowDto: CommentShowDto[] = [];
  loading = true;
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.loadAllComments();
  }

  private loadAllComments() {
    this.newsService.showComments(this.idNews).pipe(first()).subscribe(commentsShowDto => {
      this.commentsShowDto = commentsShowDto;
      this.loading = false;
    });
  }

}
