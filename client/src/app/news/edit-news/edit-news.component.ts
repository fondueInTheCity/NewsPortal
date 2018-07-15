import {Component, OnInit, OnDestroy} from '@angular/core';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {NewsService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import { Subscription } from 'rxjs';
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
  //private postInfo = new NewsInfoDto();
  private tags: Tag[] = [];
  private categories: {
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
              private router: Router) {
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
    let tagInput = document.getElementById("postTags");
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
        if (activeCategory.length != 0 ) {
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
    // this.registerForm = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   username: ['', Validators.required],
    //   password: ['', Validators.required],
    //   email: ['', Validators.required]
    // });
    // this.Title = new FormControl();
    // this.Description = new FormControl();
    // this.Tags = new FormControl();
    // this.Categories = new FormControl();
    // this.Content = new FormControl();
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

  setNewsCategories() {
    this.news.categories = [];
    for (const category of this.categories) {
      if (category.isActive) {
        this.news.categories.push({id: category.id, name: category.name});
      }
    }
  }

  disableHideDropdown($event){
    $event.stopPropagation();
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.uploadSubscription && this.uploadSubscription.unsubscribe();
  }

}
