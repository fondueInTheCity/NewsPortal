import {Component, OnInit, Input} from '@angular/core';
import {UserEditDto} from "../../../dto/userEditDto";
import {ProfileService} from '../../../service';

@Component({
  selector: 'app-profile-info',
  templateUrl: 'profile-info.component.html',
  styleUrls: ['profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  //@Input() user: UserEditDto;
  user: UserEditDto;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.user = this.profileService.getUser();
  }

}
