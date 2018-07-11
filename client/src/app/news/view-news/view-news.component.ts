import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../model';
import {CommentAddDto, CommentShowDto, LikeDto} from '../../dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {NewsInfoDto} from '../../dto/newsInfoDto';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.css']
})
export class ViewNewsComponent implements OnInit {
  @Input() post: News;
  commentForm: FormGroup;
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
              (snapshot: NewsInfoDto) => {
                this.post = snapshot.post;
              }
            );
          }
        });
    }
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
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
  showRating(): boolean {
    return this.currentUserJson !== null && !this.new;
  }
}
