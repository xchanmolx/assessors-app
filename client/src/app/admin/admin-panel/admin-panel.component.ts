import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { BusyService } from 'src/app/core/services/busy.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IUser } from 'src/app/shared/models/user';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  users!: IUser[];

  constructor(private adminService: AdminService, private notifierService: NotifierService,
    private accountService: AccountService, public busyService: BusyService, private cd: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
    this.loadUsersWithRoles();
  }

  ngAfterViewInit() {
    this.busyService.idle();
    this.cd.detectChanges();
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  loadUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users: any) => {
      this.users = users;
    }, error => {
      this.notifierService.showNotification('You are not authorized to access this page.', 'OK', 'error');
      this.router.navigate(['/']);
    });
  }
}
