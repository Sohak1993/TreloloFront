import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectedUser } from '../models/User/connectedUser-model';
import { Login } from '../models/User/login-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Observable connection
  private _isConnected$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isConnected$ : Observable<boolean> = this._isConnected$.asObservable();

  constructor(
    private _http: HttpClient,
    private _router : Router
    ) { }

  _url = 'https://localhost:7085/api/user/'

  login(loginForm : Login) : void {
    this._http.post<ConnectedUser>(this._url+'login', loginForm).subscribe({
      next : (res) => {
        localStorage.setItem('token', res.token);
        this._isConnected$.next(true);
        this._router.navigateByUrl('/');
      }
    });
  }

  logout() : void {
    localStorage.removeItem('token');
    this._isConnected$.next(false);
    this._router.navigateByUrl('/');

  }
}
