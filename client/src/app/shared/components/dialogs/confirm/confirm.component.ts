import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRealProperty } from 'src/app/shared/models/realProperty';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  action!: string;
  local_data!: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IRealProperty,
      public dialogRef: MatDialogRef<ConfirmComponent>) {
        this.local_data = {...data};
        this.action = this.local_data.action;
      }
      
  ngOnInit(): void {  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
