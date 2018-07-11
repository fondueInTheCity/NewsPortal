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
  isFirstTimeOpen: boolean = true;
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
      tag: ['', Validators.required]
    });
    this.sectionService.getCategories().pipe(first()).subscribe((categories : Category[]) => {
      for (let category of categories) {
        this.categories.push({id: category.id, name: category.name, isActive: false});
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
    let tagName = this.newsForm.controls.tag.value;
    tagName = tagName.trim();
    let existedTag = this.news.tags.filter(obj => {
      return obj["name"] === tagName
    });
    if ((tagName.length !== 0) && (tagName.length < 24) && (existedTag.length === 0))
      this.news.tags.push({id: null, name: tagName});
  }

  removeTag(tag: string){
    let removableTag = this.news.tags.filter(obj => {
      return obj["name"] === tag
    });
    if (removableTag.length != 0) {
      let index = this.news.tags.indexOf(removableTag[0], 0);
      this.news.tags.splice(index, 1);
    }
  }

  pasteChecked(){
    if (this.isFirstTimeOpen){
      for (let category of this.categories) {
        let activeCategory = this.news.categories.filter(obj => {
          return obj["name"] === category.name
        });
        if (activeCategory.length != 0 )
          this.categories[category.id - 1].isActive = true;
      }
      this.isFirstTimeOpen = false
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.news.post.value_rating = 0;
    this.setNewsCategories();
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
    this.setNewsCategories();
    this.newsService.editPost(this.news).pipe(first())
      .subscribe(
        data => {
          this.router.navigate([`/news/${this.news.post.id}`]);
        },
        error => {
          //sdfsdfefsd
        });
  }

  setNewsCategories(){
    this.news.categories = [];
    for (let category of this.categories) {
      if (category.isActive)
        this.news.categories.push({id: category.id, name: category.name});
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.uploadSubscription && this.uploadSubscription.unsubscribe();
  }

}
