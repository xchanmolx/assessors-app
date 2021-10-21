import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/shared/models/user';
import { BusyService } from '../services/busy.service';
import { NotifierService } from '../services/notifier.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser$!: Observable<IUser>;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private accountService: AccountService, public busyService: BusyService,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
    this.notifierService.showNotification('You have successfully logged out.', 'OK', 'success');
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

}
