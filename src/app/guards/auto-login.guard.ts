import { Injectable } from '@angular/core';
import { CanLoad, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated?.pipe(
     map(isAuthenticated => {
        console.log('Found previous token, automatic login');
        console.log(isAuthenticated);
        if (isAuthenticated){
          this.router.navigateByUrl('/home', { replaceUrl: true });}
          return true;
      })
    );
  }
}
