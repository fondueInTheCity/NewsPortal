import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards';
import { JwtInterceptor } from './_helpers';
import {AlertService, AuthenticationService, UserService} from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';;
import { AlertComponent } from './_directives/alert.component'
;
import { RegisterComponent } from './register/register.component'
;
import { HeaderComponent } from './shared/header/header.component'
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        MDBBootstrapModule.forRoot(),
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AlertComponent ,
        RegisterComponent
,
        HeaderComponent
    ],
    schemas: [  ],
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

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
