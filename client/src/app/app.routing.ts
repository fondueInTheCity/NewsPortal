import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home';
import {LoginComponent} from './auth/login';
import {RegisterComponent} from './auth/register';
import {ProfileComponent} from './user/profile/profile.component';
import {RestorePasswordComponent} from './auth/restore-password/restore-password.component';
import {RememberComponent} from './auth/remember/remember.component';
import {UsersListComponent} from './user/users-list/users-list.component';
import {Exception404Component} from './exception/exception404/exception404.component';
import {MarkdownComponent} from './news/markdown/markdown.component';
import {ViewNewsComponent} from './news/view-news/view-news.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent }, //, canActivate: [AuthGuard]
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth/activate/:code', component: LoginComponent},
    { path: 'restorePassword', component: RestorePasswordComponent},
    { path: 'restorePassword/:code', component: RestorePasswordComponent},
    { path: 'remember', component: RememberComponent},
    { path: 'restore/:code', component: RestorePasswordComponent},
    { path: 'users', component: UsersListComponent },
    { path: 'profile/:username', component: ProfileComponent },
    { path: 'addPost', component: MarkdownComponent},
    { path: 'editPost/:id', component: MarkdownComponent},
    { path: 'news/:id', component: ViewNewsComponent},
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
