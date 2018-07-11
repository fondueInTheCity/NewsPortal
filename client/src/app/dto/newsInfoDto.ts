import {News} from "../model/news";
import {Comment} from "../model/comment";
import {Category} from "../model/category";
export class NewsInfoDto {
  post: News;
  tags: Object[];
  categories: Category[];

  constructor(){
    this.post = new News();
    this.tags = [];
    this.categories = [];
  }
}
