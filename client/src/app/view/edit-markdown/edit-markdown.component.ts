import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../models';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../service';

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
    // if (new) {
    //   this.news.id_user = localStorage.
    // }
    this.newsService.addPost(this.news).pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          //sdfsdfefsd
        });
  }

  onSave() {
    //this.newsService.editNews(this.id, this.news);
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
