import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountService } from 'src/app/account/account.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmUserDeleteComponent } from 'src/app/shared/components/dialogs/confirm-user-delete/confirm-user-delete.component';
import { IUser } from 'src/app/shared/models/user';
import { AdminService } from '../admin.service';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @Input() users!: IUser[];
  bsModalRef!: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService,
    private accountService: AccountService, private notifierService: NotifierService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmUserDeleteComponent, {
      data: obj,
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Delete') {
        this.deleteUser(result.data);
      }
    });
  }

  deleteUser(row_obj: IUser) {
    this.users = this.users.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.accountService.deleteUser(+row_obj.id).subscribe(response => {
      this.notifierService.showNotification(`${response.firstName} has been deleted successfully.`, 'OK', 'success');
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem deleting the user.`, 'OK', 'error');
    });
  }

  editRolesModal(user: IUser) {
    const initialState: any = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((response: any) => {
      const rolesToUpdate = {
        roleNames: [...response.filter((el: any) => el.checked === true).map((el: any) => el.name)]
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, error => {
          console.log(error);
        });
      }
    });
  }

  private getRolesArray(user: IUser) {
    const roles = [];
    const userRoles: any = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'}
    ];

    for (let i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      
      for (let j = 0; j < userRoles.length; j++) {
        if (availableRoles[i].name === userRoles[j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }
    return roles;
  }

}
