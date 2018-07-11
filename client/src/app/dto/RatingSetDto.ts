export class RatingSetDto {
  idPost: number;
  username: string;
  rating: number;

  constructor(idPost: number,
              username: string,
              rating: number) {
    this.idPost = idPost;
    this.username = username;
    this.rating = rating;
  }
}
