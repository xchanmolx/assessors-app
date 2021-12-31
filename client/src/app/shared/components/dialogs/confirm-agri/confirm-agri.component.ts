import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAgricultural } from 'src/app/shared/models/agricultural';

@Component({
  selector: 'app-confirm-agri',
  templateUrl: './confirm-agri.component.html',
  styleUrls: ['./confirm-agri.component.scss']
})
export class ConfirmAgriComponent implements OnInit {
  local_data!: any;
  action!: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IAgricultural,
  public dialogRef: MatDialogRef<ConfirmAgriComponent>) { 
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
