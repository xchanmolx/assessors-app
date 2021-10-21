import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../account/account.service';
import { NotifierService } from '../core/services/notifier.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router,
      private notifierService: NotifierService) {}

  canActivate(): boolean {
    if (this.accountService.loggedIn()) {
      return true;
    }

    this.notifierService.showNotification('You must be logged in to authorized and access this area.', 'OK', 'error');
    this.router.navigate(['/']);
    return false;
  }
  
}
