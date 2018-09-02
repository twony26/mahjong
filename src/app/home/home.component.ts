import { Package } from '../packages/shared/package.model';
import { Observable } from 'rxjs/Rx';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { PackageService } from '../packages/shared/package.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };
    packageList: Observable<any>;
    constructor(private svc: PackageService) { }

    ngOnInit() {
        let c = this.svc.getData();
        this.packageList = c;
    }
}
