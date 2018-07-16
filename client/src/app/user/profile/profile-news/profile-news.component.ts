import {Component, OnInit} from '@angular/core';
import {UserEditDto, NewsInfoDto} from '../../../dto';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NewsService, ProfileService, UserService, AuthenticationService} from '../../../service';
import {first} from 'rxjs/internal/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-news',
  templateUrl: 'profile-news.component.html',
  styleUrls: ['profile-news.component.css']
})
export class ProfileNewsComponent implements OnInit {
  profile = this.profileService;
  user: UserEditDto;
  news: NewsInfoDto[] = [];
  searchForm: FormGroup;
  newsInSearch: NewsInfoDto[] = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  sortByNameType = 1;
  sortByDateType = 1;
  clickSortByName = false;
  clickSortByDate = false;
  username: string;

  constructor(private router: Router,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.username = params['username'];
      this.newsService.getNewsByUsername(this.username).pipe(first()).subscribe((newsInfoDto: NewsInfoDto[]) => {
        this.newsInSearch = this.news = this.newsService.sortByDate(newsInfoDto, -1);
      });
    });
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  public deletePost(id: number) {
    this.newsService.deletePost(id).pipe(first()).subscribe(
      () => {
        this.loadAllNews();
      });
  }

  private loadAllNews() {
    this.newsService.getNewsByIdUser(this.profile.getUser().id).pipe(first()).subscribe(news => {
      this.news = this.newsInSearch = this.newsService.sortByDate(news, -1);
    });
  }

  sortByTitle() {
    this.clickSortByName = true;
    this.clickSortByDate = false;
    this.newsInSearch = this.newsService.sortByName(this.newsInSearch, this.sortByNameType);
    this.sortByNameType *= -1;
  }

  sortByDate() {
    this.clickSortByName = false;
    this.clickSortByDate = true;
    this.newsInSearch = this.newsService.sortByDate(this.newsInSearch, this.sortByDateType);
    this.sortByDateType *= -1;
  }

  showImageSortByNameDown(): boolean {
    return this.clickSortByName && this.sortByNameType === 1;
  }

  showImageSortByNameUp(): boolean {
    return this.clickSortByName && this.sortByNameType === -1;
  }

  showImageSortByDateDown(): boolean {
    return this.clickSortByDate && this.sortByDateType === 1;
  }

  showImageSortByDateUp(): boolean {
    return this.clickSortByDate && this.sortByDateType === -1;
  }

  search() {
    this.newsInSearch = this.newsService.searchByFragment(this.news, this.searchForm.controls.search.value);
  }

  isCanAddNews(): boolean {
    return this.authenticationService.isCanAddNews(this.username);
  }
}
