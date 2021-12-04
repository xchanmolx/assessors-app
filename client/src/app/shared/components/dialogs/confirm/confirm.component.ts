import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { RealPropertyService } from 'src/app/real-property/real-property.service';
import { IAgricultural } from 'src/app/shared/models/agricultural';
import { IBarangay } from 'src/app/shared/models/barangay';
import { ICommercial } from 'src/app/shared/models/commercial';
import { IIndustrial } from 'src/app/shared/models/industrial';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { IResidential } from 'src/app/shared/models/residential';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  local_data!: any;
  action!: string;
  barangays: IBarangay[] = [];
  agriculturals: IAgricultural[] = [];
  agri!: IAgricultural | undefined;
  commercials: ICommercial[] = [];
  industrials: IIndustrial[] = [];
  residentials: IResidential[] = [];

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IRealProperty,
      public dialogRef: MatDialogRef<ConfirmComponent>, public realPropertyService: RealPropertyService) {
        this.local_data = {...data};
        this.action = this.local_data.action;

        this.getBarangays();
        this.getAgriculturals();
        this.getCommercials();
        this.getIndustrials();
        this.getResidentials();
      }
      
  ngOnInit(): void {  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  getBarangays() {
    this.realPropertyService.getBarangays().subscribe((barangays) => {
      this.barangays = barangays;
    }, error => {
      console.log(error);
    });
  }

  getAgriculturals() {
    this.realPropertyService.getAgriculturals().subscribe((agriculturals) => {
      this.agriculturals = agriculturals;
    }, error => {
      console.log(error);
    });
  }

  onActualUseAgriSelected(event: MatSelectChange) {
    this.agri = this.agriculturals.find(agri => agri.name === event.value);

    for (const kindOfProperty of this.local_data.kindOfProperties) {
      if (this.agri?.name === kindOfProperty.actualUse) {
         kindOfProperty.agriculturalLandId = this.agri?.id;
      }
      console.log(kindOfProperty.agriculturalLandId);
    }
      
    this.getAgriculturals();
  }

  getCommercials() {
    this.realPropertyService.getCommercials().subscribe((commercials) => {
      this.commercials = commercials;
    }, error => {
      console.log(error);
    });
  }

  getIndustrials() {
    this.realPropertyService.getIndustrials().subscribe((industrials) => {
      this.industrials = industrials;
    }, error => {
      console.log(error);
    });
  }

  getResidentials() {
    this.realPropertyService.getResidentials().subscribe((residentials) => {
      this.residentials = residentials;
    }, error => {
      console.log(error);
    });
  }

  kindOfLandsCondition(event: MatSelectChange) {
    for (let kindOfProperty of this.local_data.kindOfProperties) {
      if (kindOfProperty.kindOfLands === 'commercial') {
        if (event.value) {
          kindOfProperty.actualUse = 'Commerial';
        }
      }

      if (kindOfProperty.kindOfLands === 'industrial') {
        if (event.value) {
          kindOfProperty.actualUse = 'Industrial';
        }
      }

      if (kindOfProperty.kindOfLands === 'residential') {
        if (event.value) {
          kindOfProperty.actualUse = 'Residential';
        }
      }

      if (kindOfProperty.kindOfLands === 'agricultural') {
        if (event.value) {
          kindOfProperty.actualUse = 'Agricultural';
        }
      }
    }
  }
}
