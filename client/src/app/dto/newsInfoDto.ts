import {News, Category} from '../model';

export class NewsInfoDto {
  post: News;
  tags: Object[];
  categories: Category[];

  constructor() {
    this.post = new News();
    this.tags = [];
    this.categories = [];
  }
}
