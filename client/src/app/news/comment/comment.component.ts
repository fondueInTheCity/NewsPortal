import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsService, UserService} from '../../service';
import {ActivatedRoute} from '@angular/router';
import {CommentAddDto, CommentShowDto, LikeDto} from '../../dto';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {Like} from '../../model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() idPost: number;
  @Input() addComment: boolean;

  commentForm: FormGroup;
  likeDto = new LikeDto();
  commentAddDto = new CommentAddDto();
  commentsShowDto: CommentShowDto[] = [];
  currentImage: string;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    if (this.currentUser !== null) {
      this.getImage(this.currentUser.username);
    }
    this.initializeWebSocketConnection();
    this.loadAllComments();
  }

  private serverUrl = 'http://localhost:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/comment", (message) => {
        if(message.body) {
          that.loadAllComments();
          // this.commentsShowDto.push(JSON.parse(message.body));
        }
      });
    });
  }

  sendMessage(){
    this.stompClient.send("/app/send/message" , {}, JSON.stringify(this.commentAddDto));
  }

  addLike(idComment: number) {
    if (this.currentUser === null) {
      return;
    }
    this.likeDto.id_user = this.currentUser.id;
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
    this.commentAddDto.username = this.currentUser.username;
    this.commentAddDto.id_news = this.idPost;
    this.newsService.addComment(this.commentAddDto).pipe(first()).subscribe(
      data => {
        this.formControl.comment.reset();
        this.sendMessage();
        this.loadAllComments();
      },
      error => {
        //sdfsdfefsdew
      });
  }

  loadAllComments() {
    this.newsService.showComments(this.idPost).pipe(first()).subscribe(commentsShowDto => {
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
    if (this.currentUser !== null) {
      likes.forEach((like) => {
        if (like.id_user === this.currentUser.id) {
          isLike = true;
        }
      });
    }
    return isLike;
  }

  canAddComment(): boolean {
    return this.currentUser !== null && this.addComment;
  }

  ngOnDestroy(){
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }
}
