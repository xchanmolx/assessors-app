import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserEditResolver implements Resolve<IUser> {
  jwtHelper = new JwtHelperService();

  constructor(private accountService: AccountService, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
    const token = localStorage.getItem('token');

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    return this.accountService.getUserByEmail(this.authService.decodedToken.email).pipe(
        catchError(() => {
          console.log('Problem retrieving your data');
          return of(null as any);
        })
    );
  }
}
