import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IUser } from 'src/app/shared/models/user';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  users!: IUser[];

  constructor(private adminService: AdminService, private notifierService: NotifierService,
    private accountService: AccountService, private router: Router) {
      this.loadUsersWithRoles();
  }

  ngOnInit(): void {
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  loadUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((response: any) => {
      this.users = response;
    }, error => {
      this.notifierService.showNotification(`${error.errors} You are not authorized to access this page.`, 'OK', 'error');
      this.router.navigate(['/']);
    });
  }
}
