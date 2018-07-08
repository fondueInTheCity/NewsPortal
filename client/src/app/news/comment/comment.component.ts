import {Component, Input, OnInit} from '@angular/core';
import {CommentShowDto} from '../../dto/index';
import {first} from 'rxjs/internal/operators';
import {NewsService} from '../../service/index';
import {News} from '../../model';
import {CommentAddDto} from '../../dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() post: News;
  @Input() addComment: boolean;
  commentForm: FormGroup;
  commentAddDto = new CommentAddDto();
  commentsShowDto: CommentShowDto[] = [];
  loading = true;
  constructor(private newsService: NewsService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    this.loadAllComments();
  }

  get formControl() { return this.commentForm.controls; }
  onSubmit() {
    this.commentAddDto.text = this.formControl.comment.value;
    this.commentAddDto.id_user = this.post.id_user;
    this.commentAddDto.id_news = this.post.id;
    this.newsService.addComment(this.commentAddDto).pipe(first()).subscribe(
      data => {
        this.formControl.comment.reset();
        this.loadAllComments();
      },
      error => {
        //sdfsdfefsd
      });
  }

  loadAllComments() {
    this.newsService.showComments(this.post.id).pipe(first()).subscribe(commentsShowDto => {
      this.commentsShowDto = commentsShowDto;
      this.loading = false;
    });
  }
}
