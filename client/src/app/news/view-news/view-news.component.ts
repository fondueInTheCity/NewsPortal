import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {NewsInfoDto} from '../../dto';

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
            this.newsService.getPostById(this.id).pipe(first()).subscribe((data: NewsInfoDto) => {
              this.post = data.post;
            },
              () => {
              this.router.navigate(['/exception404']);
              });
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
        () => {
          this.router.navigate([`/`]);
        },
        error => {
          //sdfsdfefsd
        });
  }

  showEdit(): boolean {
    return (!this.new && this.currentUserJson !== null ?
      ((this.currentUserJson.username === this.post.authorName || this.currentUserJson.userRole === 'ROLE_ADMIN')) : false);
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
