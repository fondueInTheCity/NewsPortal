import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../../model/index';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../../service/index';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-view-markdown',
  templateUrl: './view-markdown.component.html',
  styleUrls: ['./view-markdown.component.css']
})
export class ViewMarkdownComponent implements OnInit {
  @Input() post: News;
  new = true;
  id: number;
  currentUserJson = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
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
}
