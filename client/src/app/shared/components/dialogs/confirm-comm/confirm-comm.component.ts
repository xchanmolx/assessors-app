import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICommercial } from 'src/app/shared/models/commercial';

@Component({
  selector: 'app-confirm-comm',
  templateUrl: './confirm-comm.component.html',
  styleUrls: ['./confirm-comm.component.scss']
})
export class ConfirmCommComponent implements OnInit {
  local_data!: any;
  action!: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: ICommercial,
  public dialogRef: MatDialogRef<ConfirmCommComponent>) {
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
