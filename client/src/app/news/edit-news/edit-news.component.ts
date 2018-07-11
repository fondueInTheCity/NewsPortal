import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {News} from '../../model';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {NewsService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewsInfoDto} from "../../dto/newsInfoDto";
import {SectionService} from "../../service/section.service";
import {Category} from "../../model/category";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit, OnDestroy {
  @Input() news = new NewsInfoDto();
  @Input() new;
  private postInfo = new NewsInfoDto();
  private tags: String[] = [];
  private categories: {
    id: number;
    name: string;
    isActive: boolean;
  }[] = [];
  // private categories: Object[];
  newsForm: FormGroup;



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
              private sectionService: SectionService,
              private router: Router) {
    this.newsForm = this.formBuilder.group({
      tag: ['']
    });
    this.sectionService.getCategories().pipe(first()).subscribe((categories : Category[]) => {
      for (let category of categories) {
        this.categories.push({id: category.id, name: category.name, isActive: false});
        let activeCategory = this.news.categories.filter(obj => {
          return obj["name"] === category.name
        });
        if (activeCategory.length != 0 )
          this.categories[this.categories.length].isActive = true;
      }
    });
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
    if (this.news.post.text === undefined)
      this.news.post.text = "";
    this.news.post.text += ' <img class="img-fluid" src="' + url + '">';
  }

  addTag() {
    this.news.tags.push({id: null, name: this.newsForm.controls.tag.value});
  }

  removeTag(tag: string){
    let removableTag = this.news.tags.filter(obj => {
      return obj["name"] === tag
    });
    if (removableTag.length != 0) {
      let index = this.news.tags.indexOf(removableTag, 0);
      this.news.tags.splice(index, 1);
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    // for (let category of this.categories) {
    //   this.news.categories;
    //   this.categories.push({id: category.id, name: category.name, isActive: false});
    // }
    this.news.post.value_rating = 0;
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
          this.router.navigate([`/news/${this.news.post.id}`]);
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
