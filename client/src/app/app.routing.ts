import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import {RegisterComponent} from './register';
import {RemovedInformationComponent} from './removed-information/removed-information.component';
import {ProfileComponent} from './user/profile/profile.component';
import {UsersListComponent} from "./user/users-list/users-list.component";
import {ProfileEditComponent} from "./user/profile/profile-edit/profile-edit.component";
import {ProfileNewsComponent} from "./user/profile/profile-news/profile-news.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'removed', component: RemovedInformationComponent},
    { path: 'auth/activate/:code', component: LoginComponent},
    { path: 'users', component: UsersListComponent },
    { path: 'profile/:username', component: ProfileComponent },
      // children: [
      //   {
      //     path: '',
      //     component: ProfileNewsComponent
      //   },
      //   {
      //     path: 'edit',
      //     component: ProfileEditComponent
      //   }]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
