import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RealPropertyService } from 'src/app/real-property/real-property.service';
import { IRealProperty } from 'src/app/shared/models/realProperty';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  action!: string;
  local_data!: any;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(public realPropertyService: RealPropertyService, 
      @Optional() @Inject(MAT_DIALOG_DATA) public data: IRealProperty, 
      public dialogRef: MatDialogRef<ConfirmComponent>) { 
        this.local_data = {...data};
        this.action = this.local_data.action;
      }
      
  ngOnInit(): void {
    // http://192.168.254.100:86
    // this.local_data.pictureUrl = this.local_data.pictureUrl.substring(34, 126).trim();
    this.local_data.pictureUrl = this.local_data.pictureUrl.substring(34, 126).trim();

    // https://localhost:4433 or http://localhost:4433
    // this.local_data.pictureUrl = this.local_data.pictureUrl.substring(31, 126).trim();
  }

  upload() {
    this.realPropertyService.uploadPhoto();
    this.realPropertyService.image = null;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});

    if (this.realPropertyService.response) {
      this.local_data.pictureUrl = this.realPropertyService.response.imagePath;
      this.realPropertyService.response.imageUploadSuccess = '';
    }
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
