import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NewsService} from '../../service';
import {ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {RatingSetDto} from '../../dto';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() username: string;
  @Input() read: boolean;
  @Input() idPost: number;
  currentRating: number;
  changeRatingControl = 2;
  ratingControl = new FormControl();
  constructor(private newsService: NewsService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.idPost = params['id'];
          this.newsService.getPostRating(this.idPost).pipe(first())
            .subscribe(
              (data) => {
                this.currentRating = data;
              });
        }
      });
    if (this.idPost !== null) {
      this.newsService.getPostRating(this.idPost).pipe(first())
        .subscribe(
          data => {
            this.currentRating = data;
          });
    }
  }

  setRating() {
    if (this.changeRatingControl === 0) {
      this.newsService.setRatingPost(new RatingSetDto(this.idPost, this.username, this.ratingControl.value)).pipe(first())
        .subscribe(
          (currentRating) => {
            this.currentRating = currentRating;
          });
    } else {
      --this.changeRatingControl;
    }
  }
}
