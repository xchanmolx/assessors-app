import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IIndustrial } from 'src/app/shared/models/industrial';

@Component({
  selector: 'app-confirm-indu',
  templateUrl: './confirm-indu.component.html',
  styleUrls: ['./confirm-indu.component.scss']
})
export class ConfirmInduComponent implements OnInit {
  local_data!: any;
  action!: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IIndustrial,
  public dialogRef: MatDialogRef<ConfirmInduComponent>) {
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
