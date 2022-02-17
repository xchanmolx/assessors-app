import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMergeOfLands } from 'src/app/shared/models/mergeOfLands';

@Component({
  selector: 'app-confirm-single-use-land',
  templateUrl: './confirm-single-use-land.component.html',
  styleUrls: ['./confirm-single-use-land.component.scss']
})
export class ConfirmSingleUseLandComponent implements OnInit {
  local_data!: any;
  action!: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IMergeOfLands,
  public dialogRef: MatDialogRef<ConfirmSingleUseLandComponent>) { 
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
