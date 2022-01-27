import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/admin.service';
import { ILogo } from 'src/app/shared/models/logo';

@Component({
  selector: 'app-confirm-logo',
  templateUrl: './confirm-logo.component.html',
  styleUrls: ['./confirm-logo.component.scss']
})
export class ConfirmLogoComponent implements OnInit {
  local_data!: any;
  action!: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: ILogo,
  public dialogRef: MatDialogRef<ConfirmLogoComponent>, public adminService: AdminService) { 
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  clearInputFileValue() {
    this.adminService.formFiles = [];
  }

}
