import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { PackageService } from '../shared/package.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Package } from '../shared/package.model';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize, map, filter } from 'rxjs/operators';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
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
  imgUrl: FormControl;
  contactNumber: FormControl;
  selectedFiles: FileList;
  uploadedFiles: any;
  uploadMultipleFiles: any;
  modalRef: BsModalRef;
  test: string;
  uploadBtn: boolean = true;

  @ViewChild('url') nameInputRef: ElementRef;
  @ViewChild('fileInput') fileInputRef: ElementRef;
  @ViewChild('multiplefileInput') multiplefileInput: ElementRef;
  @ViewChild('autoShownModal') autoShownModal: ModalDirective;

  isModalShown: boolean = false;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };



  constructor(private svc: PackageService, private afStorage: AngularFireStorage, private modalService: BsModalService) {
    this.uploadMultipleFiles = [];
    this.currentUpload = 0;
    this.uploadedFiles = [];
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.uploadBtn = false;
  }

  uploadMulti() {
    let files = this.selectedFiles;
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.uploadedFiles.push({ name: files[idx].name, completed: 0 });
      this.uploadMultiple(files[idx]);
    })

    this.multiplefileInput.nativeElement.value = '';
    this.uploadBtn = true;
  }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.inclusions = new FormControl('', Validators.required);
    this.minPersons = new FormControl('', Validators.required);
    this.maxPersons = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.imgUrl = new FormControl('', Validators.required);

    this.packageForm = new FormGroup({
      name: new FormControl(),
      contactNumber: new FormControl(),
      inclusions: new FormControl(),
      minPersons: new FormControl(),
      maxPersons: new FormControl(),
      duration: new FormControl(),
      description: new FormControl(),
      address: new FormControl(),
      imgUrl: new FormControl()
    });

    //this.resetForm();
  }

  savePackage(packageForm: any) {
    let p: Package = new Package();
    p = packageForm as Package;
    p.imgUrl = this.image_url;
    p.gallery = this.uploadMultipleFiles;
    this.svc.insertPackage(packageForm);

    alert('Submitted Successfully');
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
    this.uploadedFiles = [];
  }

  resetForm(packageForm?: FormGroup) {
    if (packageForm != null) {
      packageForm.reset({
        name: { value: '' }
      });
      this.imgUrl = null;
    }
    this.name = new FormControl('');
    // this.svc.selectedPackage = {
    //     $key: null,
    //     description: '',
    //     duration: '',
    //     address: '',
    //     inclusions: '',
    //     maxPersons: 0,
    //     minPersons: 0,
    //     name: '',
    //     imgUrl: '',
    //     contactNumber: ''
    // }
  }


  upload(event) {
    const file = event.target.files[0];

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    const path = moment(new Date()).format('YYYYMMDDhhmmssss') + '/' + file.name;
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
        this.image_url = uploadTask.snapshot.downloadURL;
      }
    );
  }

  uploadMultiple(event) {
    const file = event;

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    const path = moment(new Date()).format('YYYYMMDDhhmmssss') + '/' + file.name;
    var storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(path).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        let c = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
        let name = snapshot['ref'].name;
        this.uploadedFiles.map(x => {
          if (x.name === name) {
            x.completed = c;
          }
          return x;
        });
      },
      (error) => {
        console.log(error)
      },
      () => {
        let _url = uploadTask.snapshot.downloadURL;
        console.log(_url);
        this.uploadMultipleFiles.push({ image: _url });
        this.uploadedFiles = this.uploadedFiles.filter(x => x.completed !== 100);
        console.log(this.uploadedFiles);
      }
    );
  }

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

}
