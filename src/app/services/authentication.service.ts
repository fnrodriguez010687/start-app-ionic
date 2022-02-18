import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

import { Storage } from '@capacitor/storage';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token = '';
  constructor(private http: HttpClient) {
    this.loadToken();
  }
  async loadToken(){
   const token = await Storage.get({ key: TOKEN_KEY});
     if (token && token.value) {
       console.log('set token: ', token.value);
       console.log('token: ', token);
       this.token = token.value;
       this.isAuthenticated?.next(true);
     }
     console.log('Load Token: ', this.isAuthenticated);
    }

  login(credentials: {email: any; password: any}): Observable<any> {
    return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => from(Storage.set({key: TOKEN_KEY, value: token}))),
      tap(_ => {
        this.isAuthenticated?.next(true);
        console.log('Login: ', this.isAuthenticated);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated?.next(false);
    console.log('Logout: ', this.isAuthenticated);
    return Storage.remove({key: TOKEN_KEY});
  }
}

