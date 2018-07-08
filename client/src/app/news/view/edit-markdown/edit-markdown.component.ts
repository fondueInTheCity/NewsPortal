import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../../model/index';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../../service/index';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-edit-markdown',
  templateUrl: './edit-markdown.component.html',
  styleUrls: ['./edit-markdown.component.css']
})
export class EditMarkdownComponent implements OnInit {
  @Input() news = new News();
  @Input() new;
  viewMode = 'editTab';
  public uploader:FileUploader = new FileUploader({});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  options: any = {
    autoScrollEditorIntoView: true,
    maxLines: 28,
    showLineNumbers: false
  };
  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private router: Router) {
  }

  imageUpload(event: any){
    console.log(event)
  }

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
