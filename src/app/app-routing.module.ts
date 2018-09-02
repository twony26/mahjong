import { UserProfileComponent } from './user-profile/user-profile.component';
import { WindowService } from './shared/window.service';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { SliderComponent } from './slider/slider.component';
import { PackageListComponent } from './packages/package-list/package-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HomeComponent } from './home/home.component';
import { PackageComponent } from './packages/package/package.component';
import { AuthGuard } from './core/auth.guard';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'createpackage', component: PackageComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'slider', component: SliderComponent, canActivate: [AuthGuard] },
  { path: 'phone', component: PhoneLoginComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'packagelist', component: PackageListComponent },
  { path: 'packagelist/:guid', component: PackageListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [WindowService],
})
export class AppRoutingModule { }
