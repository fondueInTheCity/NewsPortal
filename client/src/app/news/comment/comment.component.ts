import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService, NewsService, UserService} from '../../service';
import {ActivatedRoute} from '@angular/router';
import {CommentAddDto, CommentShowDto, LikeDto} from '../../dto';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {Like} from '../../model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {
  private serverUrl = 'http://localhost:8080/socket';
  private stompClient;
  @Input() idPost: number;
  @Input() addComment: boolean;

  commentForm: FormGroup;
  likeDto = new LikeDto();
  commentAddDto = new CommentAddDto();
  commentsShowDto: CommentShowDto[] = [];
  currentImage: string;

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    if (this.authenticationService.isLogin()) {
      this.getImage(this.authenticationService.getCurrentUsername());
    }
    this.initializeWebSocketConnection();
    this.loadAllComments();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function() {
      that.stompClient.subscribe('/comment', (message) => {
        if (message.body) {
          that.loadAllComments();
        }
      });
    });
  }

  sendMessage() {
    this.stompClient.send('/app/send/message' , {}, JSON.stringify(this.commentAddDto));
  }

  addLike(idComment: number) {
    if (!this.authenticationService.isLogin()) {
      return;
    }
    this.likeDto.id_user = this.authenticationService.getCurrentUserId();
    this.likeDto.id_comment = idComment;
    this.newsService.addLike(this.likeDto).pipe(first())
      .subscribe(
        () => {
          this.loadAllComments();
        });
  }

  get formControl() { return this.commentForm.controls; }

  onSubmit() {
    this.commentAddDto.text = this.formControl.comment.value;
    this.commentAddDto.username = this.authenticationService.getCurrentUsername();
    this.commentAddDto.id_news = this.idPost;
    this.newsService.addComment(this.commentAddDto).pipe(first()).subscribe(
      () => {
        this.formControl.comment.reset();
        this.sendMessage();
        this.loadAllComments();
      });
  }

  loadAllComments() {
    this.newsService.showComments(this.idPost).pipe(first()).subscribe((commentsShowDto) => {
      this.commentsShowDto = commentsShowDto;
      this.commentsShowDto = this.newsService.sortComments(this.commentsShowDto);
    });
  }

  getImage(username: string) {
    this.userService.getImage(username).pipe(first()).subscribe((urlImage: string) => {
      this.currentImage = urlImage;
    });
  }

  isLiked(likes: Like[]): boolean {
    let isLike = false;
    if (this.authenticationService.isLogin()) {
      likes.forEach((like) => {
        if (like.id_user === this.authenticationService.getCurrentUserId()) {
          isLike = true;
        }
      });
    }
    return isLike;
  }

  canAddComment(): boolean {
    return this.authenticationService.isLogin() && this.addComment;
  }

  ngOnDestroy() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }
}
