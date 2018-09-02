import { SliderComponent } from './slider/slider.component';
import { PackageListComponent } from './packages/package-list/package-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HomeComponent } from './home/home.component';
import { PackageComponent } from './packages/package/package.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'createpackage', component: PackageComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'packagelist', component: PackageListComponent },
  { path: 'packagelist/:guid', component: PackageListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
