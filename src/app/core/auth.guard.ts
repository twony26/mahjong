import { take, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthGuard implements CanActivate {
  private user: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    public userService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        
        return resolve(true);
      }, err => {
        this.router.navigate(['/login']);
        return resolve(false);
      })
    })
  }
}
