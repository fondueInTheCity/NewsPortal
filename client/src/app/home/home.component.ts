import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {NewsService, UserService} from '../service';
import {HttpClient} from '@angular/common/http';
import {NewsInfoDto} from "../dto/newsInfoDto";
import {ActivatedRoute, Params} from "@angular/router";

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    news: NewsInfoDto[] = [];
    viewNews: NewsInfoDto[] = [];
    rangeValues: number[] = [0, 5];
    searchedNews: NewsInfoDto[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private newsService: NewsService) {
    }

    ngOnInit() {
      this.newsService.getNews().pipe(first()).subscribe(news => {
        this.news = news;
        this.viewNews = this.news;
        this.viewSearchNews();
      });
    }

    filterNewsRate(){
      console.log("asdasd");
      this.viewNews = this.news.filter(obj => {
        return (obj.post.value_rating >= this.rangeValues[0]) && (obj.post.value_rating <= this.rangeValues[1])
      });
    }

    viewSearchNews(){
      this.activatedRoute.queryParams
        .subscribe(params => {
          this.searchedNews = [];
          let searchText = params['search'];
          if ((searchText === undefined) || (searchText === "")){
            this.viewNews = this.news;
            return;
          }
          let re  = new RegExp(searchText, "gi");
          for(let postInfo of this.news){
            if (postInfo.post.name.search(re) !== -1)
              this.searchedNews.push(postInfo);
          }
          if (this.searchedNews.length !== 0)
            this.viewNews = this.searchedNews;
        });
    }
}
