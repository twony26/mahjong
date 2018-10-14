
import { map } from 'rxjs/operators/map'
import { Observable } from 'rxjs/Rx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Guid } from "guid-typescript";
import * as firebase from 'firebase';


@Injectable()
export class FBService {
    // todoCollectionRef: AngularFirestoreCollection<Card>;
    // todo: Observable<Card[]>;
    cardCollection: AngularFirestoreCollection<Card>;
    cardDocument: AngularFirestoreDocument<Card>;
    card: Observable<Card[]>;
    guid: Guid;
    


    constructor(private fb: AngularFireDatabase, private afs: AngularFirestore) {
        //this.insertcard();
        
    }

    documentToDomainObject = _ => {
        const object = _.payload.doc.data();
        object.id = _.payload.doc.id;
        return object;
    }

    getUpdate() {
        // this.afs.collection('card').snapshotChanges().forEach(function (change) {
        //     return change.forEach(function (e) {
        //         if (e.type === 'modified') {
        //             let attr = e.payload.doc.data();
        //             return attr;
        //         }
        //     })
        // });

        let d = this.afs.collection('card').snapshotChanges().forEach(function (change) {
            return change.map(b => {
                if (b.type === 'modified') {
                    const data = b.payload.doc.data() as Card;
                    return { data };
                }
            })
        });

        console.log(d);
    }


    insertcard(c: Card) {
        this.afs.collection('card').doc(c.id).set(JSON.parse(JSON.stringify(c)));
    }

    updatecard(card: Card) {
        this.cardDocument = this.afs.doc('card/' + card.id);
        this.cardDocument.update(JSON.parse(JSON.stringify(card)));
    }

    checkIfCardAlreadyDisplayed(id: string) {
        return this.afs.collection('card').doc(id).ref.get().then((doc) => {
            if(doc.exists){
                if(doc.data().x > 0 && doc.data().y > 0){
                    console.log('fb=>true');
                    return true;                    
                }
            }
            return false;
        });
    }
}

export class Card {
    x: number;
    y: number;
    id: string;
    group: string;
    isFront: boolean;
    player: number;
    rotation: string;
}

