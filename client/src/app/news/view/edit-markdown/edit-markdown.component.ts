import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../../model/index';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../../service/index';

@Component({
  selector: 'app-edit-markdown',
  templateUrl: './edit-markdown.component.html',
  styleUrls: ['./edit-markdown.component.css']
})
export class EditMarkdownComponent implements OnInit {
  @Input() news = new News();
  @Input() new;
  options: any = {
    autoScrollEditorIntoView: true,
    maxLines: 28,
    showLineNumbers: false
  };
  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    this.newsService.addPost(this.news).pipe(first())
      .subscribe(
        data => {
          this.router.navigate([`/`]);
        },
        error => {
          //sdfsdfefsd
        });
  }

  onSave() {
    this.newsService.editPost(this.news).pipe(first())
      .subscribe(
        data => {
          this.router.navigate([`/news/${this.news.id}`]);
        },
        error => {
          //sdfsdfefsd
        });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
