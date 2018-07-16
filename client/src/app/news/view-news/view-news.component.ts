import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService, NewsService} from '../../service';
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

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private router: Router,
              public authenticationService: AuthenticationService) { }

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
        });
  }

  getCurrentUsername(): string {
    return this.authenticationService.getCurrentUsername();
  }

  showEdit(): boolean {
    return (!this.new && this.authenticationService.isLogin() ?
      ((this.authenticationService.getCurrentUsername() === this.post.authorName || this.authenticationService.isAdmin())) : false);
  }

  showAddComment(): boolean {
    return this.authenticationService.isLogin() && !this.new;
  }

  showComments(): boolean {
    return !this.new;
  }

  showRating(): boolean {
    return !this.new;
  }

  canSetRating(): boolean {
    return !this.authenticationService.isLogin();
  }
}
