import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {News} from '../../model';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {NewsService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit, OnDestroy {
  @Input() news = new News();
  @Input() new;
  viewMode = 'editTab';
  public uploader:FileUploader = new FileUploader({});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  private uploadSubscription: Subscription;

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
              private formBuilder: FormBuilder,
              private newsService: NewsService,
              private router: Router) {
  }

  imageUpload(files: string){
    for(let file of files){
      let formdata: FormData = new FormData();
      formdata.append('file', file);
      this.uploadSubscription = this.newsService.addImageToPost(formdata).pipe(first()).subscribe((data) => {
        this.pasteImageInMarkdown(data);
      });
    }
  }

  pasteImageInMarkdown(url: string){
    if (this.news.text === undefined)
      this.news.text = "";
    this.news.text += ' <img class="img-fluid" src="' + url + '">';
  }

  addTagToDom(tagName: string) {

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

  ngOnDestroy(): void {
    this.uploadSubscription && this.uploadSubscription.unsubscribe();
  }
}
