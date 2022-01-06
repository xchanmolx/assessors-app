import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IResidential } from 'src/app/shared/models/residential';

@Component({
  selector: 'app-confirm-resi',
  templateUrl: './confirm-resi.component.html',
  styleUrls: ['./confirm-resi.component.scss']
})
export class ConfirmResiComponent implements OnInit {
  local_data!: any;
  action!: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IResidential,
  public dialogRef: MatDialogRef<ConfirmResiComponent>) {
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
