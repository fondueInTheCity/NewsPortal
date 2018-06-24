
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './_guards';
import { JwtInterceptor } from './_helpers';
import {AlertService, AuthenticationService, UserService} from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AlertComponent } from './_directives/alert.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RemovedInformationComponent } from './removed-information/removed-information.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        MDBBootstrapModule.forRoot(),
        routing,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AlertComponent ,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
        RemovedInformationComponent,
        ProfileComponent,
        UsersListComponent

    ],
  schemas: [],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
