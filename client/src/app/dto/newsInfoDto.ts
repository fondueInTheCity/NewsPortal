import {News} from '../model/news';
export class NewsInfoDto {
  post: News;
  tags: Object[];
  categories: Object[];

  constructor(){
    this.post = new News();
    this.tags = [];
    this.categories = [];
  }
}
