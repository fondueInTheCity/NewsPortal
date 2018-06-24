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
import { FooterComponent } from './shared/footer/footer.component';;
import { RemovedInformationComponent } from './removed-information/removed-information.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        MDBBootstrapModule.forRoot(),
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AlertComponent ,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
        RemovedInformationComponent
,
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
