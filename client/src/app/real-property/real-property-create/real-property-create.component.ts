import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { IAgricultural } from 'src/app/shared/models/agricultural';
import { IBarangay } from 'src/app/shared/models/barangay';
import { ICommercial } from 'src/app/shared/models/commercial';
import { IIndustrial } from 'src/app/shared/models/industrial';
import { PhotoParams } from 'src/app/shared/models/photoParams';
import { IResidential } from 'src/app/shared/models/residential';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-real-property-create',
  templateUrl: './real-property-create.component.html',
  styleUrls: ['./real-property-create.component.scss']
})
export class RealPropertyCreateComponent implements OnInit {
  createForm!: FormGroup;
  @ViewChild(TextInputComponent) textInputComponent!: TextInputComponent;
  defaultPropertyLocationSelect!: string;
  defaultKindOfPropertyAssessedSelect = 'land';
  defaultKindOfLandsSelect = 'agricultural';
  defaultTaxableExemptSelect = 'taxable';
  defaultMemoranda = 'General Revision';
  defaultApprovedMessage = '*Approved by authority from Mariflor D. Vero, OIC-Provincial Assessor Per office memorandum dated January 14, 2020, & pursuant to SEC. 472 (b) (12) of R.A. 7160';
  defaultNotes = 'This declaration is for real property taxation purpose only and the valuation indicated herein are based on the schedule of base unit & fair market value prepared for the herein purpose and duly enacted into Ordinance by the Sangguniang Panlalawigan Under Ordinance No. 2019-17 dated December 26, 2019, & approved by Gwendolyn F. Garcia, Provincial Governor dated January 3, 2020, & office circular no. 01-2020.';
  defaultRecommendedBy = 'Roy D. Bendanillo';
  defaultApprovedBy = 'Roy D. Bendanillo';
  taxDecId!: number;
  photoParams = new PhotoParams();
  today = new Date().toLocaleDateString();
  agriculturals: IAgricultural[] = [];
  commercials: ICommercial[] = [];
  industrials: IIndustrial[] = [];
  residentials: IResidential[] = [];
  barangays: IBarangay[] = [];

  constructor(private fb: FormBuilder, public realPropertyService: RealPropertyService,
    private notifierService: NotifierService) {
    this.createAddRealPropertyForm();
    this.getAgriculturals();
    this.getCommercials();
    this.getIndustrials();
    this.getResidentials();
    this.getBarangays();
  }

  ngOnInit(): void {
  }

  createAddRealPropertyForm() {
    this.createForm = this.fb.group({
      tdNo: [null, Validators.required],
      owner: [null, Validators.required],
      address: [null, Validators.required],
      propertyLocation: [null, Validators.required],
      propertyIndentificationNo: [null, Validators.required],
      arpNo: [null],
      tinNo: [null],
      telephoneNo: [null],
      octTctCloaNo: [null],
      octNo: [null],
      dated: [null],
      surveyLotNo: [null, Validators.required],
      assessorLotNo: [null],
      blkNo: [null],
      boundary: this.fb.group({
        north: [null],
        east: [null],
        south: [null],
        west: [null],
      }),
      kindOfPropertyAssessed: [this.defaultKindOfPropertyAssessedSelect],
      noOfStoreys: [null],
      briefDescription: [null],
      specify: [null],
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
            residentialLandId: ['0']
          }
        )
      ]),
      totalAssessedValueInWord: [null, Validators.required],
      taxableExempt: [this.defaultTaxableExemptSelect, Validators.required],
      quarter: [null, Validators.required],
      year: ['0', Validators.required],
      recommendedBy: [this.defaultRecommendedBy],
      approvedBy: [this.defaultApprovedBy],
      date: [this.today],
      declarationCancels: [null, Validators.required],
      ownerTdNoCancels: [null],
      previousAssessedValue: ['0.00'],
      memoranda: [this.defaultMemoranda],
      approvedMessage: [this.defaultApprovedMessage],
      notes: [this.defaultNotes],
      formFiles: [null, Validators.required]
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
        residentialLandId: ['0']
      })
    );
  }

  deleteKindOfProperty(index: number) {
    this.kindOfProperties.removeAt(index);
  }

  clearInputFileValue() {
    this.realPropertyService.formFiles = [];
  }

  uploadPhoto() {
    this.photoParams.taxDecId = this.taxDecId;
    this.realPropertyService.uploadPhoto(this.photoParams).subscribe(() => {
      this.clearInputFileValue();
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem uploading the photo.`, 'OK', 'error');
    });
  }

  onSubmit() {
    this.realPropertyService.createRealProperty(this.createForm.value).subscribe((response) => {
      this.taxDecId = response.id;      

      this.notifierService.showNotification(`${this.createForm.get('owner')?.value} has been added successfully.`, 'OK', 'success');

      this.createAddRealPropertyForm();
      this.setDefaultPropertyLocationByBarangay();

      this.textInputComponent.ngAfterViewInit();

      this.uploadPhoto();
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem adding the real property.`, 'OK', 'error');
    });
  }

  zerosKindOfLandsIdSelected(event: MatSelectChange) {
      for (const kindOfProperty of this.kindOfProperties.controls) {
        if (kindOfProperty.get('kindOfLands')!.value === event.value) {
          kindOfProperty.patchValue({
            agriculturalLandId: '0',
            commercialLandId: '0',
            industrialLandId: '0',
            residentialLandId: '0',
            classification: null, // back to null for required validation
            actualUse: null // back to null for required validation
          });
        }
        
        // Kind of Property Assessed - Building
        if (this.createForm.get('kindOfPropertyAssessed')!.value === 'building') {
          if (event.value === 'agricultural') {
            if (kindOfProperty.get('kindOfLands')!.value === event.value) {
              kindOfProperty.patchValue({ 
                classification: 'agricultural',
                actualUse: 'Agricultural'
              });
            }
          }

          if (event.value === 'commercial') {
            if (kindOfProperty.get('kindOfLands')!.value === event.value) {
              kindOfProperty.patchValue({ 
                classification: 'commercial',
                actualUse: 'Commercial'
              });
            }
          }

          if (event.value === 'industrial') {
            if (kindOfProperty.get('kindOfLands')!.value === event.value) {
              kindOfProperty.patchValue({ 
                classification: 'industrial',
                actualUse: 'Industrial'
              });
            }
          }

          if (event.value === 'residential') {
            if (kindOfProperty.get('kindOfLands')!.value === event.value) {
              kindOfProperty.patchValue({ 
                classification: 'residential',
                actualUse: 'Residential'
              });
            }
          }
        }
      }
      
    this.getAgriculturals();
    this.getCommercials();
    this.getIndustrials();
    this.getResidentials();
  }

  onActualUseAgriSelected(event: MatSelectChange) {
    let agri = this.agriculturals.find(agri => agri.name === event.value);

    for (const kindOfProperty of this.kindOfProperties.controls) {
      if (agri?.name === kindOfProperty.get('actualUse')!.value) {
         kindOfProperty.patchValue({agriculturalLandId: agri?.id});
      }
    }
      
    this.getAgriculturals();
  }

  onClassificationCommSelected(event: MatSelectChange) {
    let comm = this.commercials.find(comm => comm.name === event.value);

    for (const kindOfProperty of this.kindOfProperties.controls) {
      if (comm?.name === kindOfProperty.get('classification')!.value) {
          kindOfProperty.patchValue({
            commercialLandId: comm?.id, 
            actualUse: 'Commercial'
          });
      }
    }
      
    this.getCommercials();
  }

  onClassificationInduSelected(event: MatSelectChange) {
    let indu = this.industrials.find(indu => indu.name === event.value);

    for (const kindOfProperty of this.kindOfProperties.controls) {
      if (indu?.name === kindOfProperty.get('classification')!.value) {
          kindOfProperty.patchValue({
            industrialLandId: indu?.id,
            actualUse: 'Industrial'
          });
      }
    }
      
    this.getIndustrials();
  }

  onClassificationResiSelected(event: MatSelectChange) {
    let resi = this.residentials.find(resi => resi.name === event.value);

    for (const kindOfProperty of this.kindOfProperties.controls) {
      if (resi?.name === kindOfProperty.get('classification')!.value) {
          kindOfProperty.patchValue({
            residentialLandId: resi?.id,
            actualUse: 'Residential'
          });
      }
    }
      
    this.getResidentials();
  }

  getAgriculturals() {
    this.realPropertyService.getAgriculturals().subscribe((response) => {
      this.agriculturals = response;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the agricultural lands.`, 'OK', 'error');
    });
  }

  getCommercials() {
    this.realPropertyService.getCommercials().subscribe((response) => {
      this.commercials = response;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the commercial lands.`, 'OK', 'error');
    });
  }

  getIndustrials() {
    this.realPropertyService.getIndustrials().subscribe((response) => {
      this.industrials = response;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the industrial lands.`, 'OK', 'error');
    });
  }

  getResidentials() {
    this.realPropertyService.getResidentials().subscribe((response) => {
      this.residentials = response;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the residential lands.`, 'OK', 'error');
    });
  }

  getBarangays() {
    this.realPropertyService.getBarangays().subscribe((response) => {
      this.barangays = response;

      this.setDefaultPropertyLocationByBarangay();  
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the barangays.`, 'OK', 'error');
    });
  }

  setDefaultPropertyLocationByBarangay() {
    this.defaultPropertyLocationSelect = this.barangays[0]!.name;
    this.createForm.patchValue({
      propertyLocation: this.defaultPropertyLocationSelect
    });
  }
}
