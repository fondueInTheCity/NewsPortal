import {Component, Input, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {News} from '../../model';
import {CommentAddDto, CommentShowDto, LikeDto} from '../../dto';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() idPost: number;
  @Input() addComment: boolean;
  commentForm: FormGroup;
  likeDto = new LikeDto();
  commentAddDto = new CommentAddDto();
  commentsShowDto: CommentShowDto[] = [];
  currentUserJson = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    this.loadAllComments();
  }


  addLike(idComment: number) {
    if (this.currentUserJson === null) {
      return;
    }
    this.likeDto.username = this.currentUserJson.username;
    this.likeDto.id_comment = idComment;
    this.newsService.addLike(this.likeDto).pipe(first())
      .subscribe(
        data => {
          this.loadAllComments();
        },
        error => {
          //sdfsdfefsd
        });
  }
  get formControl() { return this.commentForm.controls; }
  onSubmit() {
    this.commentAddDto.text = this.formControl.comment.value;
    this.commentAddDto.username = this.currentUserJson.username;
    this.commentAddDto.id_news = this.idPost;
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
    this.newsService.showComments(this.idPost).pipe(first()).subscribe(commentsShowDto => {
      this.commentsShowDto = commentsShowDto;
      this.commentsShowDto = this.newsService.sortComments(this.commentsShowDto);
    });
  }
}