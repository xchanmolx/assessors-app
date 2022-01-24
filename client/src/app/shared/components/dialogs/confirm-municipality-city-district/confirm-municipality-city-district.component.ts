import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMunicipalityCityDistrict } from 'src/app/shared/models/municipalityCityDistrict';

@Component({
  selector: 'app-confirm-municipality-city-district',
  templateUrl: './confirm-municipality-city-district.component.html',
  styleUrls: ['./confirm-municipality-city-district.component.scss']
})
export class ConfirmMunicipalityCityDistrictComponent implements OnInit {
  local_data!: any;
  action!: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IMunicipalityCityDistrict,
  public dialogRef: MatDialogRef<ConfirmMunicipalityCityDistrictComponent>) { 
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
