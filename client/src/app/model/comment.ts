import {CommentShowDto} from '../dto/CommentShowDto';

export class Comment {
  id: number;
  text: string;
  id_news: number;
  id_user: number;
  constructor(commentShowDto: CommentShowDto) {
    this.text = commentShowDto.text;
    this.id_user = commentShowDto.id_user;
  }
}
