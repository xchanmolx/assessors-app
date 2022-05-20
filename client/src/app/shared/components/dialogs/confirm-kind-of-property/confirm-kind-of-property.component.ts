import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IKindOfProperty } from 'src/app/shared/models/kindOfProperty';

@Component({
  selector: 'app-confirm-kind-of-property',
  templateUrl: './confirm-kind-of-property.component.html',
  styleUrls: ['./confirm-kind-of-property.component.scss']
})
export class ConfirmKindOfPropertyComponent implements OnInit {
  action!: string;
  local_data!: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IKindOfProperty,
      public dialogRef: MatDialogRef<ConfirmKindOfPropertyComponent>) {
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
