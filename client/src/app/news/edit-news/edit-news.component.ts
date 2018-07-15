import {Component, OnInit, OnDestroy} from '@angular/core';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {InfoService, NewsService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsInfoDto} from '../../dto';
import {SectionService} from '../../service';
import {Category, Tag} from '../../model/';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit, OnDestroy {
  news = new NewsInfoDto();
  new = true;
  Title: FormControl;
  Description: FormControl;
  //private postInfo = new NewsInfoDto();
  private tags: Tag[] = [];
  categories: {
    id: number;
    name: string;
    isActive: boolean;
  }[] = [];
  isFirstTimeOpen = true;
  newsForm: FormGroup;
  viewMode = 'editTab';
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  private uploadSubscription: Subscription;

  // public fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private newsService: NewsService,
              private sectionService: SectionService,
              private router: Router,
              private infoService: InfoService) {
    this.newsForm = this.formBuilder.group({
      tag: ['']
    });
    this.sectionService.getCategories().pipe(first()).subscribe((categories: Category[]) => {
      for (const category of categories) {
        this.categories.push({id: category.id, name: category.name, isActive: false});
      }
    });
    this.sectionService.getTags().pipe(first()).subscribe((tags: Tag[]) => {
      this.tags = tags;
    });
  }

  imageUpload(files: string) {
    for (const file of files) {
      const formdata: FormData = new FormData();
      formdata.append('file', file);
      this.uploadSubscription = this.newsService.addImageToPost(formdata).pipe(first()).subscribe((data) => {
        this.pasteImageInMarkdown(data);
      });
    }
  }

  pasteImageInMarkdown(url: string) {
    if (this.news.post.text === undefined) {
      this.news.post.text = '';
    }
    this.news.post.text += ' <img class="img-fluid" src="' + url + '">';
  }

  addTag() {
    let tagName = this.newsForm.controls.tag.value;
    tagName = tagName.trim();
    const existedTag = this.news.tags.filter(obj => {
      return obj['name'] === tagName;
    });
    if ((tagName.length !== 0) && (tagName.length < 24) && (existedTag.length === 0)) {
      this.news.tags.push({id: null, name: tagName});
    }
    let tagInput = document.getElementById('postTags');
  }

  removeTag(tag: string) {
    const removableTag = this.news.tags.filter(obj => {
      return obj['name'] === tag;
    });
    if (removableTag.length !== 0) {
      const index = this.news.tags.indexOf(removableTag[0], 0);
      this.news.tags.splice(index, 1);
    }
  }

  pasteChecked() {
    if (this.isFirstTimeOpen) {
      for (const category of this.categories) {
        const activeCategory = this.news.categories.filter(obj => {
          return obj['name'] === category.name;
        });
        if (activeCategory.length !== 0 ) {
          this.categories[category.id - 1].isActive = true;
        }
      }
      this.isFirstTimeOpen = false;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.news.post.id_user = params['authorId'];
        if (params.hasOwnProperty('id')) {
          const id = params['id'];
          this.new = false;
          this.newsService.getPostById(id).pipe(first()).subscribe((snapshot: NewsInfoDto) => {
              this.news = snapshot;
            },
            () => {
            this.router.navigate(['/exception404']);
            });
        }
      });
    this.Title = new FormControl(this.news.post.name, [Validators.required,
      Validators.minLength(4), Validators.maxLength(30)]);
    this.Description = new FormControl(this.news.post.description, [Validators.required,
      Validators.minLength(4), Validators.maxLength(30)]);
  }

  onSubmit() {
    if (this.isInvalidForm()) {
      this.showError();
      return;
    }
    this.news.post.value_rating = 0;
    this.setNewsCategories();
    this.newsService.addPost(this.news).pipe(first())
      .subscribe(
        () => {
          this.router.navigate([`/`]);
        });
  }

  onSave() {
    if (this.isInvalidForm()) {
      this.showError();
      return;
    }
    this.setNewsCategories();
    this.newsService.editPost(this.news).pipe(first())
      .subscribe(
        () => {
          this.router.navigate([`/news/${this.news.post.id}`]);
        });
  }

  setNewsCategories() {
    this.news.categories = [];
    for (const category of this.categories) {
      if (category.isActive) {
        this.news.categories.push({id: category.id, name: category.name});
      }
    }
  }

  disableHideDropdown($event) {
    $event.stopPropagation();
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  private isNullCategories(): boolean {
    let answer = false;
    for (const category of this.categories) {
      answer = answer || category.isActive;
    }
    return !answer;
  }

  private isInvalidForm(): boolean {
    return this.isNullCategories() || this.isNullContent() || this.Title.invalid || this.Description.invalid;
  }

  private isNullContent(): boolean {
    return this.news.post.text === '' || this.news.post.text === null || this.news.post.text === undefined;
  }

  private showError() {
    if (this.Title.invalid) {
      this.infoService.alertInformation('error', 'Title is Invalid.');
    }
    if (this.Description.invalid) {
      this.infoService.alertInformation('error', 'Description is Invalid.');
    }
    if (this.isNullCategories()) {
      this.infoService.alertInformation('error', 'News has not category.');
    }
    if (this.isNullContent()) {
      this.infoService.alertInformation('error', 'Content is empty.');
    }
  }

  ngOnDestroy(): void {
    this.uploadSubscription && this.uploadSubscription.unsubscribe();
  }

}
