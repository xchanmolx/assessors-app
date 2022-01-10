import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBarangay } from 'src/app/shared/models/barangay';

@Component({
  selector: 'app-confirm-brgy',
  templateUrl: './confirm-brgy.component.html',
  styleUrls: ['./confirm-brgy.component.scss']
})
export class ConfirmBrgyComponent implements OnInit {
  local_data!: any;
  action!: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IBarangay,
  public dialogRef: MatDialogRef<ConfirmBrgyComponent>) {
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
