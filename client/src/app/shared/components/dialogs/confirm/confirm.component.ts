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
    let agri = this.agriculturals.find(agri => agri.name === event.value);

    for (const kindOfProperty of this.local_data.kindOfProperties) {
      if (agri?.name === kindOfProperty.actualUse) {
         kindOfProperty.agriculturalLandId = agri?.id;
      }
    }
      
    this.getAgriculturals();
  }

  onClassificationCommSelected(event: MatSelectChange) {
    let comm = this.commercials.find(comm => comm.name === event.value);

    for (const kindOfProperty of this.local_data.kindOfProperties) {
      if (comm?.name === kindOfProperty.classification) {
        kindOfProperty.commercialLandId = comm?.id;
        kindOfProperty.actualUse = 'Commercial';
      }
    }
      
    this.getCommercials();
  }

  onClassificationInduSelected(event: MatSelectChange) {
    let indu = this.industrials.find(indu => indu.name === event.value);

    for (const kindOfProperty of this.local_data.kindOfProperties) {
      if (indu?.name === kindOfProperty.classification) {
        kindOfProperty.industrialLandId = indu?.id;
        kindOfProperty.actualUse = 'Industrial';
      }
    }
      
    this.getIndustrials();
  }

  onClassificationResiSelected(event: MatSelectChange) {
    let resi = this.residentials.find(resi => resi.name === event.value);

    for (const kindOfProperty of this.local_data.kindOfProperties) {
      if (resi?.name === kindOfProperty.classification) {
        kindOfProperty.residentialLandId = resi?.id;
        kindOfProperty.actualUse = 'Residential';
      }
    }
      
    this.getResidentials();
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

  zerosKindOfLandsIdSelected(event: MatSelectChange) {
      for (const kindOfProperty of this.local_data.kindOfProperties) {
        if (kindOfProperty.kindOfLands === event.value) {
          kindOfProperty.agriculturalLandId = 0;
          kindOfProperty.commercialLandId = 0;
          kindOfProperty.industrialLandId = 0;
          kindOfProperty.residentialLandId = 0;
          kindOfProperty.classification = null; // back to null for required validation
          kindOfProperty.actualUse = null; // back to null for required validation
        }
        
        // Kind of Property Assessed - Building
        if (this.local_data.kindOfPropertyAssessed === 'building') {
          if (event.value === 'agricultural') {
            if (kindOfProperty.kindOfLands === event.value) {
              kindOfProperty.classification = 'agricultural';
              kindOfProperty.actualUse = 'Agricultural';
            }
          }

          if (event.value === 'commercial') {
            if (kindOfProperty.kindOfLands === event.value) {
              kindOfProperty.classification = 'commercial';
              kindOfProperty.actualUse = 'Commercial';
            }
          }

          if (event.value === 'industrial') {
            if (kindOfProperty.kindOfLands === event.value) {
              kindOfProperty.classification = 'industrial';
              kindOfProperty.actualUse = 'Industrial';
            }
          }

          if (event.value === 'residential') {
            if (kindOfProperty.kindOfLands === event.value) {
              kindOfProperty.classification = 'residential';
              kindOfProperty.actualUse = 'Residential';
            }
          }
        }
      }
      
    this.getAgriculturals();
    this.getCommercials();
    this.getIndustrials();
    this.getResidentials();
  }
}
