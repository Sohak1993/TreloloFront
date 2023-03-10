import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectedGuard implements CanActivate {

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this._userService.isConnected$.subscribe({
      next: (res) => {
        if (!res) {
          this._router.navigateByUrl('/login')
          return false;
        }
      }
    })
    return true;
  }

}
