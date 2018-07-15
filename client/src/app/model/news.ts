export class News {
  id: number;
  name: string;
  description: string;
  text: string;
  publishDate: string;
  id_user: number;
  userImage: string;
  authorName: string;
  value_rating: number;

  constructor() {
    this.id = null;
    this.name = '';
    this.description = '';
    this.text = '';
    this.publishDate = '';
    this.id_user = null;
    this.userImage = '';
    this.authorName = '';
    this.value_rating = null;
  }
}
