import { AuthGuard } from './core/auth.guard';
import { OwlModule } from 'ngx-owl-carousel';
import { HttpClientModule } from '@angular/common/http';
import { PackagesComponent } from './packages/packages.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestoreModule
} from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

/// DELETE firebaseConfig
/// Add your own firebase config to environment.ts
/// Then use it to initialize angularfire2 AngularFireModule.initializeApp(environment.firebaseConfig),
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PackageComponent } from './packages/package/package.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PackageService } from './packages/shared/package.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { PackageListComponent } from "./packages/package-list/package-list.component";
import { SliderComponent } from './slider/slider.component';
import { CoreModule } from './core/core.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import * as firebase from 'firebase';
import { UserProfileComponent } from './user-profile/user-profile.component';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    DropZoneDirective,
    FileSizePipe,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PackageComponent,
    PackagesComponent,
    PackageListComponent,
    SliderComponent,
    PhoneLoginComponent,
    UserProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    CoreModule
  ],
  providers: [PackageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
