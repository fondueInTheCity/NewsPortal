import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './auth/guards';
import { JwtInterceptor } from './auth/helpers';
import {AlertService, AuthenticationService} from './auth/service';
import {NewsService, UserService, ProfileService} from './service';
import { HomeComponent } from './home';
import { LoginComponent } from './auth/login';
import { AlertComponent } from './auth/directives/alert.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { RememberComponent } from './auth/remember/remember.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { ProfileEditComponent } from './user/profile/profile-edit/profile-edit.component';
import { ProfileNewsComponent } from './user/profile/profile-news/profile-news.component';
import { Exception404Component } from './exception/exception404/exception404.component';
import { ProfileInfoComponent } from './user/profile/profile-info/profile-info.component';
import {MarkdownModule} from 'ngx-markdown';
import { AceEditorModule } from 'ng2-ace-editor';
import { MarkdownComponent } from './news/markdown/markdown.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TagComponent } from './news/tag/tag.component';
import {FileUploadModule} from 'ng2-file-upload';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { ViewNewsComponent } from './news/view-news/view-news.component';
import { CommentComponent } from './news/comment/comment.component';
import { RatingComponent } from './news/rating/rating.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        MDBBootstrapModule.forRoot(),
        MarkdownModule.forRoot({ loader: HttpClient }),
        AceEditorModule,
        FileUploadModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AlertComponent ,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
        ProfileComponent,
        RestorePasswordComponent ,
        RememberComponent,
        UsersListComponent,
        ProfileEditComponent,
        ProfileNewsComponent,
        Exception404Component,
        ProfileInfoComponent,
        MarkdownComponent,
        TagComponent,
        EditNewsComponent,
        ViewNewsComponent,
        CommentComponent,
        RatingComponent
    ],
  schemas: [],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        NewsService,
        ProfileService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
