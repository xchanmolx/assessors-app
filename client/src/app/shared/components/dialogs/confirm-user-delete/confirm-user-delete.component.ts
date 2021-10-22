import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-confirm-user-delete',
  templateUrl: './confirm-user-delete.component.html',
  styleUrls: ['./confirm-user-delete.component.scss']
})
export class ConfirmUserDeleteComponent implements OnInit {
  action!: string;
  local_data!: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IUser,
  public dialogRef: MatDialogRef<ConfirmUserDeleteComponent>) {
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

}
