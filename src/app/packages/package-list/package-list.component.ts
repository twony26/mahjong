import { ActivatedRoute, Params, Router } from '@angular/router';
import { firebase } from '@firebase/app';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript/dist/guid';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PackageService } from '../shared/package.service';
import { Package } from '../shared/package.model';

@Component({
    selector: 'package-list',
    templateUrl: './package-list.component.html',
    styles: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {
    modeView: string = 'listview';

    packageList: Observable<any>;
    packagedata: Package;
    downloadURL: Observable<string>;
    image_url: string;
    currentUpload: number;

    packageForm: FormGroup;
    name: FormControl;
    inclusions: FormControl;
    minPersons: FormControl;
    maxPersons: FormControl;
    duration: FormControl;
    description: FormControl;
    address: FormControl;
    contactNumber: FormControl;
    imgUrl: string;
    @ViewChild('fileInput') fileInputRef: ElementRef;

    constructor(private svc: PackageService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.packageList = this.svc.getData();
        console.log(this.packageList);

        this.route.params.forEach((params:Params) => {
            let d = this.route.snapshot.data['package'];
        });
    }

    backTolist() {
        this.modeView = 'listview';
        console.log('sdasd00');
        this.router.navigate(['/packagelist']);
        this.modeView = 'listview';
    }

    viewPackageDetail(p: Package) {
        console.log(p);
        this.modeView = 'viewpackage';
        this.packagedata = p;
    }

    updatePackageDetail() {
        this.packageForm = new FormGroup({
            name: new FormControl(this.packagedata.name, Validators.required),
            contactNumber: new FormControl(this.packagedata.contactNumber, Validators.required),
            inclusions: new FormControl(this.packagedata.inclusions, Validators.required),
            minPersons: new FormControl(this.packagedata.minPersons, Validators.required),
            maxPersons: new FormControl(this.packagedata.maxPersons, Validators.required),
            duration: new FormControl(this.packagedata.duration, Validators.required),
            description: new FormControl(this.packagedata.description, Validators.required),
            address: new FormControl(this.packagedata.address, Validators.required),
        });
        this.imgUrl = this.packagedata.imgUrl;

        this.modeView = 'updatepackage';
    }

    updatePackage(packageForm) {
        let p: Package = new Package();
        p = packageForm as Package;
        p.guid = this.packagedata.guid;
        p.imgUrl = this.imgUrl;
        this.svc.updatePackageDetail(p).
            then(x => {
                alert('Package has been successfully updated');
            }).catch(y => {
                console.log(y)
            });
    }

    resetForm() {
        this.packageForm.reset({
            name: '',
            contactNumber: '',
            inclusions: '',
            minPersons: '',
            maxPersons: '',
            duration: '',
            description: '',
            address: '',
            imgUrl: ''
        });

        this.image_url = '';
        this.currentUpload = 0;
        this.fileInputRef.nativeElement.value = '';
    }

    changePrimaryImage(event) {
        this.deletePreviousImage(this.imgUrl);
        const file = event.target.files[0];

        if (file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type :( ')
            return;
        }

        const path = (new Date().getTime()).toString() + '/' + file.name;
        var storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child(path).put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                let c = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
                this.currentUpload = c;
            },
            (error) => {
                console.log(error)
            },
            () => {
                this.imgUrl = uploadTask.snapshot.downloadURL;
            }
        );
    }

    deletePreviousImage(image: string) {
        const storageRef = firebase.storage().refFromURL(image);
        storageRef.delete();
    }

}
