import {Component, OnInit, Input} from '@angular/core';
import {UserEditDto} from '../../../dto/userEditDto';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NewsService, ProfileService, UserService} from '../../../service';
import {News} from '../../../model';
import {first} from 'rxjs/internal/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsInfoDto} from "../../../dto/newsInfoDto";

@Component({
  selector: 'app-profile-news',
  templateUrl: 'profile-news.component.html',
  styleUrls: ['profile-news.component.css']
})
export class ProfileNewsComponent implements OnInit {
  //@Input() user: UserEditDto = new UserEditDto();
  user: UserEditDto;
  news: NewsInfoDto[] = [];
  searchForm: FormGroup;
  newsInSearch: NewsInfoDto[] = [];
  sortByNameType = 1;
  sortByDateType = 1;
  clickSortByName = false;
  clickSortByDate = false;
  username: string;
  constructor(private router: Router,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private profileService: ProfileService) {}
  ngOnInit() {
    //this.profileService.loadUserByUsername(this.username);
    this.user = this.profileService.getUser();
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
    this.loadAllNews();
  }
  isCanAddNews(): boolean {
    let currentUserJson = JSON.parse(localStorage.getItem('currentUser'));
    let isSelfAddNews: boolean = (((currentUserJson.userRole === 'ROLE_ADMIN') ||
    (currentUserJson.userRole === 'ROLE_WRITER')) && (this.user['username'] === currentUserJson.username));
    let isAdminPostsByOthers: boolean = ((currentUserJson.userRole === 'ROLE_ADMIN') &&
    (this.user['role'] === 'Writer'));
    return isSelfAddNews || isAdminPostsByOthers;
  }
  public deletePost(id: number) {
    this.newsService.deletePost(id).pipe(first()).subscribe(
      data => {
        this.loadAllNews();
        //this.router.navigate([`/`]);
      },
      error => {
        //sdfsdfefsd
      });
  }
  private loadAllNews() {
    this.newsService.getNewsByIdUser(this.user.id).pipe(first()).subscribe(news => {
      this.news = this.newsInSearch = news;
    });
  }
  sortByTitle() {
    this.clickSortByName = true;
    this.clickSortByDate = false;
    this.news = this.newsService.sortByName(this.news, this.sortByNameType);
    this.sortByNameType *= -1;
  }
  sortByDate() {
    this.clickSortByName = false;
    this.clickSortByDate = true;
    this.news = this.newsService.sortByDate(this.news, this.sortByDateType);
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
    this.newsInSearch = this.news;
    this.newsInSearch = this.newsService.searchByFragment(this.news, this.searchForm.controls.search.value);
  }
}
