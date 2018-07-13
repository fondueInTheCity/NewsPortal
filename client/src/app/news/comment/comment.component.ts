import {Component, Input, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsService, UserService} from '../../service';
import {ActivatedRoute} from '@angular/router';
import {CommentAddDto, CommentShowDto, LikeDto} from '../../dto';
// import * as Stomp from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';

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
  currentImage: string;
  image = 'https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg';
  currentUserJson = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    this.getImage(this.currentUserJson.username);
    // this.initializeWebSocketConnection();
    this.loadAllComments();
  }

  private serverUrl = 'http://localhost:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;

  // initializeWebSocketConnection(){
  //   let ws = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   let that = this;
  //   this.stompClient.connect({}, function(frame) {
  //     that.stompClient.subscribe("/chat", (message) => {
  //       if(message.body) {
  //         console.log(message.body);
  //       }
  //     });
  //   });
  // }
  //
  // sendMessage(){
  //   this.stompClient.send("/app/send/message" , {}, this.commentAddDto);
  // }

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
        // this.sendMessage();
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
}
