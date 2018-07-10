export class News {
  id: number;
  name: string;
  description: string;
  text: string;
  publishDate: string;
  id_user: number;
  authorName: string;

  constructor(){
    this.id = null;
    this.name = "";
    this.description = "";
    this.text = "";
    this.publishDate = "";
    this.id_user = null;
    this.authorName = "";
  }
}
