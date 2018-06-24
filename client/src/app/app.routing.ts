import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import {RegisterComponent} from './register';
import {RemovedInformationComponent} from './removed-information/removed-information.component';
import {ProfileComponent} from './user/profile/profile.component';
import {UsersListComponent} from "./user/users-list/users-list.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'removed', component: RemovedInformationComponent},
    { path: 'auth/activate/:code', component: LoginComponent},
    { path: 'profile/:username', component: ProfileComponent },
    { path: 'users', component: UsersListComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
