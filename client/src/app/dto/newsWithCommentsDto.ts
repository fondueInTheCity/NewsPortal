import {Comment} from '../model';
import {NewsInfoDto} from './newsInfoDto';

export class NewsWithCommentsDto {
  post: NewsInfoDto;
  comments: Comment[];

  constructor() {
    this.post = null;
    this.comments = [];
  }
}
