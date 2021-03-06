import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogNewComponent } from './blog/blog-new/blog-new.component';
import { BlogImageArrayComponent } from './blog/blog-image-array/blog-image-array.component';

import { AdminToolbarComponent } from './admin/admin-toolbar.component';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { AuthService } from './login/auth.service';
import { BlogService } from './blog/blog.service';

import { AppRoutingModule } from './app-routing.module';

export const firebaseConfig = {
  apiKey: "AIzaSyAHMGr4T_E-fjEdZKnzssU2sJPDZPkH-ic",
  authDomain: "pastry-art-by-terri.firebaseapp.com",
  databaseURL: "https://pastry-art-by-terri.firebaseio.com",
  storageBucket: "pastry-art-by-terri.appspot.com",
  messagingSenderId: "350121338833"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    BlogComponent,
    BlogDetailComponent,
    BlogImageArrayComponent,
    BlogNewComponent,
    SafeHtmlPipe,
    AdminToolbarComponent,
    AppNavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    AppRoutingModule
  ],
  providers: [
    BlogService,
    AuthService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
