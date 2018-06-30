import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './auth/login';
import { AuthGuard } from './auth/guards';
import {RegisterComponent} from './auth/register';
import {ProfileComponent} from './user/profile/profile.component';
import {RestorePasswordComponent} from './auth/restore-password/restore-password.component';
import {RememberComponent} from './auth/remember/remember.component';
import {CommentComponent} from './comment/comment.component';
import {UsersListComponent} from './user/users-list/users-list.component';
import {ProfileEditComponent} from './user/profile/profile-edit/profile-edit.component';
import {ProfileNewsComponent} from './user/profile/profile-news/profile-news.component';
import {Exception404Component} from './exception/exception404/exception404.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth/activate/:code', component: LoginComponent},
    { path: 'restorePassword', component: RestorePasswordComponent},
    { path: 'restorePassword/:code', component: RestorePasswordComponent},
    { path: 'remember', component: RememberComponent},
    { path: 'restore/:code', component: RestorePasswordComponent},
    { path: 'comment', component: CommentComponent},
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
    { path: '**', component: Exception404Component }
];

export const routing = RouterModule.forRoot(appRoutes);
