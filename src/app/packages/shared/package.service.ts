import { Observable } from 'rxjs/Rx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Package } from './package.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Guid } from "guid-typescript";


@Injectable()
export class PackageService {
    // packageList: AngularFireList<any>;
    packageCollection: AngularFirestoreCollection<Package>;
    packageDocument: AngularFirestoreDocument<Package>;
    packages: Observable<Package[]>;
    guid: Guid;

    constructor(private fb: AngularFireDatabase, private afs: AngularFirestore) { //
        //  this.packageList = this.fb.list('/packages');
        // this.packageCollection = this.afs.collection('package', x => x.orderBy('name', 'asc'));
        // this.packages = this.packageCollection.valueChanges();
        this.afs.collection('card').snapshotChanges().forEach(function (change) {
            change.forEach(function (e) {
                if (e.type === 'modified') {
                    let attr = e.payload.doc.data();
                    
                }
            })
        });
    }


    getData() {
        //return this.packageList.valueChanges();
        return this.packages;
    }

    updatePackageDetail(p: Package) {
        this.packageDocument = this.afs.doc('package/' + p.guid);
        return this.packageDocument.update(p);
    }

    getpackageDetails(guid: Guid) {
        // let c = this.fb.list('/packages/' + guid).snapshotChanges().map(changes => {
        //     return changes.map(c => (c.payload.val()));
        // });
        this.packageCollection = this.afs.collection('package', ref => {
            return ref.where('guid', '==', guid)
        });

        return this.packages = this.packageCollection.valueChanges();
    }



    insertPackage(_package: Package) {
        // const _p: Package = new Package();
        // _p.address = _package.address;
        // _p.name = _package.name;
        // _p.description = _package.description;
        // _p.maxPersons = _package.maxPersons;
        // _p.minPersons = _package.minPersons;
        // _p.duration = _package.duration;
        // _p.contactNumber = _package.contactNumber;
        // _p.inclusions = _package.inclusions;
        // _p.imgUrl = _package.imgUrl;
        // _p.guid = Guid.create()['value'];
        // _p.gallery = _package.gallery;
        // this.afs.collection('package').doc(_p.guid.toString()).set(JSON.parse(JSON.stringify(_p)));
        // //this.packageCollection.add(JSON.parse(JSON.stringify(_p)));
        // //this.packageList.push(_p);
    }


    insertcard() {
        const _p: Card = new Card();
        _p.x = 100;
        _p.y = 200;
        _p.id = "1";
        _p.group = "katak";
        _p.guid = Guid.create()['value'];
        this.afs.collection('card').doc(_p.guid.toString()).set(JSON.parse(JSON.stringify(_p)));
    }
}

export class Card {
    x: number;
    y: number;
    id: string;
    group: string;
    name: string;
    guid: Guid;
}

