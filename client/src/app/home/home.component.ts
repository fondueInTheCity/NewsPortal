import {Component, OnInit, OnDestroy} from '@angular/core';
import { first } from 'rxjs/operators';
import {NewsService} from '../service';
import {ActivatedRoute} from '@angular/router';
import {NewsInfoDto} from '../dto';
import {Tag, Category} from '../model';
import {Subscription} from 'rxjs';
import {SectionService} from '../service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit, OnDestroy {
  news: NewsInfoDto[] = [];
  viewNews: NewsInfoDto[] = [];
  rangeValues: number[] = [0, 5];
  searchedNews: NewsInfoDto[] = [];
  tags: Tag[] = [];
  categories: Category[] = [];
  filterTags: Tag[] = [];
  filterCategories: Category[] = [];
  newsSubscription: Subscription;
  routeSubscription: Subscription;
  tagSubscription: Subscription;
  categoriesSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private sectionService: SectionService,
              private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsSubscription = this.newsService.getNews().pipe(first()).subscribe(news => {
      this.news = this.newsService.sortByDate(news, -1);
      this.viewNews = this.news;
      this.viewSearchNews();
      this.loadAllTags();
      this.loadAllCategories();
    });
  }

  loadAllTags() {
    this.newsSubscription = this.sectionService.getTags().pipe(first()).subscribe((tags: Tag[]) => {
      this.tags = tags;
    });
  }

  loadAllCategories() {
    this.categoriesSubscription = this.sectionService.getCategories().pipe(first()).subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  filterNewsRate() {
    return this.news.filter((obj) => {
      return (obj.post.value_rating >= this.rangeValues[0]) && (obj.post.value_rating <= this.rangeValues[1]);
    });
  }

  viewSearchNews() {
    this.routeSubscription = this.activatedRoute.queryParams
      .subscribe(params => {
        this.searchedNews = [];
        const searchText = params['search'];
        if ((searchText === undefined) || (searchText === '')) {
          this.searchedNews = null;
          this.filterNews();
          return;
        }
        const re  = new RegExp(searchText, 'gi');
        for (const postInfo of this.news) {
          if ((postInfo.post.name.search(re) !== -1) || (postInfo.post.description.search(re) !== -1) ||
            (postInfo.post.authorName.search(re) !== -1) || (postInfo.post.text.search(re) !== -1)) {
            this.searchedNews.push(postInfo);
          }
        }
        this.filterNews();

      });
  }

  filterNews() {
    const tagSuitable = this.filterNewsByTags();
    const rateSuitable = this.filterNewsRate();
    const categoriesSuitable = this.filterNewsByCategories();
    let sectionSuitable = tagSuitable.filter(o => rateSuitable.some((item) => o === item));
    this.viewNews = sectionSuitable.filter(o => categoriesSuitable.some((item) => o === item));
    if (this.searchedNews !== null)
      this.viewNews = this.viewNews.filter(o => this.searchedNews.some((item) => o === item));
  }

  filterNewsByTags(): NewsInfoDto[] {
    const suitableArray = [];
    for (const post of this.news) {
      const isSuitable = this.filterTags.every((filter) => post.tags.some((tag) => filter.id === tag.id && filter.name === tag.name));
      if (isSuitable) {
        suitableArray.push(post);
      }
    }
    return suitableArray;
  }

  filterNewsByCategories(): NewsInfoDto[] {
    const suitableArray = [];
    for (const post of this.news) {
      const isSuitable = this.filterCategories.every((filter) =>
        post.categories.some(({id, name}) => filter.id === id && filter.name === name));
      if (isSuitable) {
        suitableArray.push(post);
      }
    }
    return suitableArray;
  }

  pasteFilterCategory(category: Category) {
    const index = this.filterCategories.indexOf(category, 0);
    if (index === -1) {
      this.filterCategories.push(category);
    }
    this.filterNews();
  }

  pasteFilterTag(tag: Tag) {
    const index = this.filterTags.indexOf(tag, 0);
    if (index === -1) {
      this.filterTags.push(tag);
    }
    this.filterNews();
  }

  removeFilterTag(tag: Tag) {
    const index = this.filterTags.indexOf(tag, 0);
    if (index > -1) {
      this.filterTags.splice(index, 1);
    }
    this.filterNews();
  }

  removeFilterCategory(category: Category) {
    const index = this.filterCategories.indexOf(category, 0);
    if (index > -1) {
      this.filterCategories.splice(index, 1);
    }
    this.filterNews();
  }

  ngOnDestroy() {
    this.newsSubscription && this.newsSubscription.unsubscribe();
    this.routeSubscription && this.routeSubscription.unsubscribe();
    this.tagSubscription && this.tagSubscription.unsubscribe();
    this.categoriesSubscription && this.categoriesSubscription.unsubscribe();
  }
}
