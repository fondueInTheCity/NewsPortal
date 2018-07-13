import {News, Category, Tag} from '../model';

export class NewsInfoDto {
  post: News;
  tags: Tag[];
  categories: Category[];

  constructor() {
    this.post = new News();
    this.tags = [];
    this.categories = [];
  }
}
