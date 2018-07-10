import {Like} from '../model';

export class CommentShowDto {
  id: number;
  text: string;
  id_user: number;
  author_name: string;
  publish_date: string;
  likes: Like[];
}
