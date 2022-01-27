import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { AdminService } from 'src/app/admin/admin.service';
import { ILogo } from 'src/app/shared/models/logo';
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
  loading$ = this.loader.loading$;
  logos: ILogo[] = [];
  logo1st!: ILogo | undefined;

  constructor(private accountService: AccountService, public loader: BusyService,
    private notifierService: NotifierService, private adminService: AdminService) { 
      this.currentUser$ = this.accountService.currentUser$;
      this.getLogos();
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
    this.notifierService.showNotification('You have successfully logged out.', 'OK', 'success');
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  getLogos() {
    this.adminService.getLogos().subscribe(response => {
      this.logos = response;

      // Find the specific 1st logo
      this.logo1st = this.logos.find(logo => logo.ordinal == 'logo1st');
    }, error => {
      this.notifierService.showNotification(`Problem loading the logos. ${error.errors}`, 'OK', 'error');
    });
  }

}
