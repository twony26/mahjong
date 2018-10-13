
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { SliderComponent } from './slider/slider.component';
import { PackageListComponent } from './packages/package-list/package-list.component';
import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HomeComponent } from './home/home.component';
import { PackageComponent } from './packages/package/package.component';
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./core/auth.guard";


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent,  canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
