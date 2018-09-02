import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PackageService } from './shared/package.service';
import { AngularFireList } from "angularfire2/database";
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
    selector: 'packages',
    templateUrl: './packages.component.html',
    styles: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    packageList: Observable<any>;
    isModalShown: boolean = false;
    galleryImages: any;
    constructor(private svc: PackageService) { }

    ngOnInit() {
        this.packageList = this.svc.getData();
    }


    showModal(images: any) {
        this.isModalShown = true;
        this.galleryImages = images;
    }

    hideModal(): void {
        this.autoShownModal.hide();
    }

    onHidden(): void {
        this.isModalShown = false;
    }

}
