import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { KindOfLandsService } from 'src/app/kind-of-lands/kind-of-lands.service';
import { RealPropertyService } from 'src/app/real-property/real-property.service';
import { IAgricultural } from 'src/app/shared/models/agricultural';
import { KindOfLandsParams } from 'src/app/shared/models/kindOfLandsParams';
import { IBarangay } from 'src/app/shared/models/barangay';
import { ICommercial } from 'src/app/shared/models/commercial';
import { IIndustrial } from 'src/app/shared/models/industrial';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { IResidential } from 'src/app/shared/models/residential';
import { BarangayParams } from 'src/app/shared/models/barangayParams';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  local_data!: any;
  action!: string;
  barangays: IBarangay[] = [];
  totalCountBara: number = 0;
  agriculturals: IAgricultural[] = [];
  totalCountAgri: number = 0;
  commercials: ICommercial[] = [];
  totalCountComm: number = 0;
  industrials: IIndustrial[] = [];
  totalCountIndu: number = 0;
  residentials: IResidential[] = [];
  totalCountResi: number = 0;
  kindOfLandsParams = new KindOfLandsParams();
  barangayParams = new BarangayParams();

  createForm!: FormGroup;
  today = new Date().toLocaleDateString();
  defaultKindOfLandsSelect = 'agricultural';
  isClicked = false;
  isHideShowCreateKindOfPropertyForm = true;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IRealProperty,
      public dialogRef: MatDialogRef<ConfirmComponent>, private fb: FormBuilder, public realPropertyService: RealPropertyService,
      private notifierService: NotifierService, private kindOfLandsService: KindOfLandsService) {
        this.local_data = {...data};
        this.action = this.local_data.action;

        this.getBarangays();
        this.getAgriculturals();
        this.getCommercials();
        this.getIndustrials();
        this.getResidentials();
      }
      
  ngOnInit(): void {  }

  showCreateKindOfPropertyForm() {
    this.isClicked = true;

    this.createKindOfPropertyForm();

    this.isHideShowCreateKindOfPropertyForm = false;
  }

  createKindOfPropertyForm() {
    this.createForm = this.fb.group({
      kindOfProperties: this.fb.array([
        this.fb.group(
          {
            kindOfLands: [this.defaultKindOfLandsSelect, Validators.required],
            classification: [null, Validators.required],
            area: ['0', Validators.required],
            marketValue: ['0.00', Validators.required],
            actualUse: [null, Validators.required],
            level: ['0', Validators.required],
            assessedValue: ['0.00', Validators.required],
            agriculturalLandId: ['0'],
            commercialLandId: ['0'],
            industrialLandId: ['0'],
            residentialLandId: ['0'],
            taxDecOfRealPropertyId: [this.local_data.id]
          }
        )
      ])
    });
  }

  get kindOfProperties() {
    return this.createForm.get('kindOfProperties') as FormArray;
  }

  addKindOfProperty() {
    this.kindOfProperties.push(
      this.fb.group({
        kindOfLands: [this.defaultKindOfLandsSelect, Validators.required],
        classification: [null, Validators.required],
        area: ['0', Validators.required],
        marketValue: ['0.00', Validators.required],
        actualUse: [null, Validators.required],
        level: ['0', Validators.required],
        assessedValue: ['0.00', Validators.required],
        agriculturalLandId: ['0'],
        commercialLandId: ['0'],
        industrialLandId: ['0'],
        residentialLandId: ['0'],
        taxDecOfRealPropertyId: [this.local_data.id]
      })
    );
  }

  deleteKindOfProperty(index: number) {
    this.kindOfProperties.removeAt(index);
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});

    if (this.isClicked === true) {
      this.onSubmit();
    }
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  onSubmit() {
    this.realPropertyService.createKindOfProperties(this.createForm.value.kindOfProperties, this.local_data.id).subscribe((response) => {
      // console.log(response);
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem saving the kind of properties.`, 'OK', 'error');
    });
  }

  getBarangays() {
    this.kindOfLandsService.getBarangays(this.barangayParams).subscribe((response) => {
      this.totalCountBara = response!.count;
      this.barangays = response!.data;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the barangays.`, 'OK', 'error');
    });
  }

  getAgriculturals() {
    this.kindOfLandsService.getAgriculturals(this.kindOfLandsParams).subscribe(response => {
      this.totalCountAgri = response!.count;
      this.agriculturals = response!.data;
    }, error => {
      this.notifierService.showNotification(`Problem loading the agricultural land. ${error.errors}`, 'OK', 'error');
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
    this.kindOfLandsService.getCommercials(this.kindOfLandsParams).subscribe((response) => {
      this.totalCountComm = response!.count;
      this.commercials = response!.data;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the commercial lands.`, 'OK', 'error');
    });
  }

  getIndustrials() {
    this.kindOfLandsService.getIndustrials(this.kindOfLandsParams).subscribe((response) => {
      this.totalCountIndu = response!.count;
      this.industrials = response!.data;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the industrial lands.`, 'OK', 'error');
    });
  }

  getResidentials() {
    this.kindOfLandsService.getResidentials(this.kindOfLandsParams).subscribe((response) => {
      this.totalCountResi = response!.count;
      this.residentials = response!.data;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the residential lands.`, 'OK', 'error');
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
