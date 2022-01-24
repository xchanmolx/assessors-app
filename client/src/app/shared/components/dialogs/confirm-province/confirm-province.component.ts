import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProvince } from 'src/app/shared/models/province';

@Component({
  selector: 'app-confirm-province',
  templateUrl: './confirm-province.component.html',
  styleUrls: ['./confirm-province.component.scss']
})
export class ConfirmProvinceComponent implements OnInit {
  local_data!: any;
  action!: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IProvince,
  public dialogRef: MatDialogRef<ConfirmProvinceComponent>) {
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
