import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../model';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {NewsService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
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
