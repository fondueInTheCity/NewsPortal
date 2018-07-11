import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {NewsService} from '../../service';
import {NewsInfoDto} from '../../dto/newsInfoDto';
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
  currentRating: number;
  flag = 2;
  ctrl = new FormControl();
  idPost: number;
  constructor(private newsService: NewsService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.idPost = params['id'];
          this.newsService.getPostRating(this.idPost).pipe(first())
            .subscribe(
              data => {
                this.currentRating = data;
              },
              error => {
                //sdfsdfefsd
              });
        }
      });
  }

  setRating() {
    if (this.flag === 0) {
      this.newsService.setRatingPost(new RatingSetDto(this.idPost, this.username, this.ctrl.value)).pipe(first())
        .subscribe(
          data => {
            this.currentRating = data;
            // this.ctrl = new FormControl(this.currentRating);
          },
          error => {
            //sdfsdfefsd
          });
    } else {
      --this.flag;
      // this.ctrl = new FormControl(this.currentRating);
    }
  }
}
