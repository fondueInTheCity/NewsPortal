import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../model';
import {CommentAddDto, CommentShowDto} from '../../dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.css']
})
export class ViewNewsComponent implements OnInit {
  @Input() post: News;
  commentForm: FormGroup;
  commentAddDto = new CommentAddDto();
  commentsShowDto: CommentShowDto[] = [];
  new = true;
  id: number;
  currentUserJson = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    if (this.post === undefined) {
      this.route.params.subscribe(
        (params: any) => {
          if (params.hasOwnProperty('id')) {
            this.id = params['id'];
            this.new = false;
            const news = this.newsService.getPostById(this.id);
            news.subscribe(
              (snapshot) => {
                this.post = snapshot;
              }
            );
          }
        });
    }
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    if (this.showComments()) {
      this.loadAllComments();
    }
  }
  deletePost(id: number) {
    this.newsService.deletePost(id).pipe(first())
      .subscribe(
        data => {
          this.router.navigate([`/`]);
        },
        error => {
          //sdfsdfefsd
        });
  }
  showEdit(): boolean {
    if (!this.new && this.currentUserJson !== null) {
      return (this.currentUserJson.username === this.post.authorName || this.currentUserJson.role === 'ROLE_ADMIN');
    }
    return false;
  }
  showAddComment(): boolean {
    return this.currentUserJson !== null && !this.new;
  }
  showComments(): boolean {
    return !this.new;
  }
  addLike() {
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
    this.newsService.showComments(this.id).pipe(first()).subscribe(commentsShowDto => {
      this.commentsShowDto = commentsShowDto;
    });
  }
}
