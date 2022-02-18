import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router){ }
  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated?.pipe(
      filter(val => val !==undefined),
      take(1),
      map(isAuthenticated => {
        console.log('AUTH: ', isAuthenticated);
        if(isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl('/login');
          return false;
        }
      })
    );
  }
}

