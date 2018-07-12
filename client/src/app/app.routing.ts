import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home';
import {LoginComponent} from './auth/login';
import {RegisterComponent} from './auth/register';
import {ProfileComponent} from './user/profile/profile.component';
import {RestorePasswordComponent} from './auth/restore-password/restore-password.component';
import {RememberComponent} from './auth/remember/remember.component';
import {UsersListComponent} from './user/users-list/users-list.component';
import {Exception404Component} from './exception/exception404/exception404.component';
import {ViewNewsComponent} from './news/view-news/view-news.component';
import {EditNewsComponent} from './news/edit-news/edit-news.component';
import {AdminGuard, WriterGuard} from './auth/guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth/activate/:code', component: LoginComponent},
    { path: 'restorePassword', component: RestorePasswordComponent},
    { path: 'remember', component: RememberComponent},
    { path: 'restore/:code', component: RestorePasswordComponent},
    { path: 'users', component: UsersListComponent, canActivate: [AdminGuard]},
    { path: 'profile/:username', component: ProfileComponent },
    { path: 'addPost', component: EditNewsComponent, canActivate: [WriterGuard]},
    { path: 'editPost/:id', component: EditNewsComponent, canActivate: [WriterGuard]},
    { path: 'news/:id', component: ViewNewsComponent},
    { path: 'exception404', component: Exception404Component},
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
    { path: '**', redirectTo: 'exception404' }
];

export const routing = RouterModule.forRoot(appRoutes);
