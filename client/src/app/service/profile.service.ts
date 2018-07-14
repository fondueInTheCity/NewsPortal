import { Injectable } from '@angular/core';
import {NewsInfoDto, UserEditDto} from '../dto';
import {first} from 'rxjs/operators';
import {UserService} from './user.service';
import {NewsService} from './news.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: UserEditDto;
  newsInSearch: NewsInfoDto[] = [];
  news: NewsInfoDto[] = [];
  isDeleted: boolean;
  role: String;
  sortByNameType = 1;
  sortByDateType = 1;
  clickSortByName = false;
  clickSortByDate = false;
  constructor(private userService: UserService,
              private newsService: NewsService) {}
  setUser(user: UserEditDto) {
    this.user = user;
  }
  getUser(): UserEditDto {
    return this.user;
  }
  setProfileByUsername(username: string) {
    this.userService.getByUsername(username)
      .pipe(first())
      .subscribe((userEditDto: UserEditDto) => {
          this.user = userEditDto;
          this.newsService.getNewsByIdUser(this.user.id).pipe(first()).subscribe((news: NewsInfoDto[]) => {
            this.news = news;
          });
          this.isDeleted = this.user.deleted;
          this.role = this.userService.transformRoleToView(this.user.role);
        },
        error => {
          // this.router.navigate(['/exception404']);
          // this.alertService.error(error);
        });
  }

  public loadAllNews() {
    this.newsService.getNewsByIdUser(this.user.id).pipe(first()).subscribe(news => {
      this.news = this.newsInSearch = news;
    });
  }

  public sortByTitle() {
    this.clickSortByName = true;
    this.clickSortByDate = false;
    this.news = this.newsService.sortByName(this.news, this.sortByNameType);
    this.sortByNameType *= -1;
  }

  public sortByDate() {
    this.clickSortByName = false;
    this.clickSortByDate = true;
    this.news = this.newsService.sortByDate(this.news, this.sortByDateType);
    this.sortByDateType *= -1;
  }

  search(fragment: string) {
    this.newsInSearch = this.news;
    this.newsInSearch = this.newsService.searchByFragment(this.news, fragment);
  }

  showImageSortByNameDown(): boolean {
    return this.clickSortByName && this.sortByNameType === 1;
  }

  showImageSortByDateDown(): boolean {
    return this.clickSortByDate && this.sortByDateType === 1;
  }

  showImageSortByNameUp(): boolean {
    return this.clickSortByName && this.sortByNameType === -1;
  }


  showImageSortByDateUp(): boolean {
    return this.clickSortByDate && this.sortByDateType === -1;
  }
}
