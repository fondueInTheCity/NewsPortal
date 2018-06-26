import {Component, OnInit, Input} from '@angular/core';
import {User} from "../../../_models/user";

@Component({
  selector: 'app-profile-news',
  templateUrl: 'profile-news.component.html',
  styleUrls: ['profile-news.component.css']
})
export class ProfileNewsComponent implements OnInit {
  @Input() user: any;
  constructor() { }

  ngOnInit() {
  }

}
