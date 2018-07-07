import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../service/index';
import {News} from '../../model/index';
import {first} from 'rxjs/internal/operators';
import {CommentAddDto} from '../../dto/index';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {
  @Input() post: News;
  commentForm: FormGroup;
  commentAddDto = new CommentAddDto();
  comment: string;
  constructor(private newsService: NewsService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
    comment: ['', Validators.required]
  });
  }
  get formControl() { return this.commentForm.controls; }
  onSubmit() {
    this.commentAddDto.text = this.formControl.comment.value;
    this.commentAddDto.id_user = this.post.id_user;
    this.commentAddDto.id_news = this.post.id;
    this.newsService.addComment(this.commentAddDto).pipe(first()).subscribe(
      data => {
        this.commentAddDto = null;
        //this.router.navigate([`/`]);
      },
      error => {
        //sdfsdfefsd
      });
  }
}
