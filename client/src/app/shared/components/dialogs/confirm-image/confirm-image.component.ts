import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPhoto } from 'src/app/shared/models/photo';

@Component({
  selector: 'app-confirm-image',
  templateUrl: './confirm-image.component.html',
  styleUrls: ['./confirm-image.component.scss']
})
export class ConfirmImageComponent implements OnInit {
  action!: string;
  local_data!: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IPhoto,
      public dialogRef: MatDialogRef<ConfirmImageComponent>) {
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
