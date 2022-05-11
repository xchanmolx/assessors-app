import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AdminService } from 'src/app/admin/admin.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { RealPropertyService } from 'src/app/real-property/real-property.service';
import { IKindOfProperty } from 'src/app/shared/models/kindOfProperty';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { IStaff } from 'src/app/shared/models/staff';
import { StaffParams } from 'src/app/shared/models/staffParams';

@Component({
  selector: 'app-confirm-revise',
  templateUrl: './confirm-revise.component.html',
  styleUrls: ['./confirm-revise.component.scss']
})
export class ConfirmReviseComponent implements OnInit {
  local_data!: any;
  action!: string;
  year = new Date().getFullYear();
  today = new Date();
  quarter = Math.floor((this.today.getMonth() + 3) / 3);
  staffs: IStaff[] = [];
  staffParams = new StaffParams();
  assessor!: IStaff | undefined;
  provincialAssessor!: IStaff | undefined;
  staffsFilter!: IStaff[] | undefined;
  staffDefault!: IStaff | undefined;
  copiedTdNo!: string;
  copiedPreviousAssessedValue!: number;

  defaultPercentAdjustmentSelect!: number;
  percentAdjustmentOptions = [
    { name: '- 8%', value: 8 },
    { name: '+ 6%', value: 6 }
  ];

  displayedColumns: string[] = ['kindOfLands', 'classification', 'area',
    'actualUse', 'marketValueLands', 'marketValue'];

  displayedColumns2: string[] = ['marketValue', 'adjustmentFactor', 'percentAdjustment', 'valueAdjustment', 'adjustedMarketValue'];

  displayedColumns3: string[] = ['kind', 'actualUse', 'adjustedMarketValue', 'assessmentLevel', 'assessedValue'];

  createForm!: FormGroup;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IRealProperty, private realPropertyService: RealPropertyService,
  private notifierService: NotifierService, private adminService: AdminService, private fb: FormBuilder, public dialogRef: MatDialogRef<ConfirmReviseComponent>) { 
    this.local_data = {...data};
    this.action = this.local_data.action;
    
    this.createAddRealPropertyForm();
    this.copiedTdNo = this.local_data.tdNo;
    this.copiedPreviousAssessedValue = this.getTotalPreviousAssessedValue();
    
    this.loadIndividualRevise(this.local_data.id);

    this.updatePropertyForm();

    this.getStaffs();
  }

  ngOnInit(): void {
  }

  createAddRealPropertyForm() {
    this.createForm = this.fb.group({
      id: [null, Validators.required],
      tdNo: [null, Validators.required],
      owner: [null, Validators.required],
      address: [null, Validators.required],
      street: [null],
      barangay: [null, Validators.required],
      municipality: [null, Validators.required],
      province: [null, Validators.required],
      propertyIdentificationNo: [null, Validators.required],
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
        id: [null],
        north: [null],
        east: [null],
        south: [null],
        west: [null],
      }),
      kindOfPropertyAssessed: [null],
      noOfStoreys: [null],
      briefDescription: [null],
      specify: [null],
      kindOfProperties: this.fb.array([
        this.fb.group(
          {
            id: [null, Validators.required],
            kindOfLands: [null, Validators.required],
            classification: [null, Validators.required],
            area: ['0', Validators.required],
            marketValue: ['0', Validators.required],
            actualUse: [null, Validators.required],
            level: ['0', Validators.required],
            assessedValue: ['0', Validators.required],
            agriculturalLandId: ['0'],
            commercialLandId: ['0'],
            industrialLandId: ['0'],
            residentialLandId: ['0'],
            taxDecOfRealPropertyId: [null]
          }
        )
      ]),
      totalAssessedValueInWord: [null, Validators.required],
      taxableExempt: [null, Validators.required],
      quarter: [null, Validators.required],
      year: ['0', Validators.required],
      recommendedBy: [null],
      approvedBy: [null],
      date: [this.today],
      declarationCancels: [null, Validators.required],
      ownerTdNoCancels: [null],
      previousAssessedValue: ['0'],
      memoranda: [null],
      approvedMessage: [null],
      notes: [null],
      defaultPercentAdjustmentSelect: [this.defaultPercentAdjustmentSelect]
    });
  }

  updatePropertyForm() {
    if (this.local_data.barangay === 'poblacion') {
      this.defaultPercentAdjustmentSelect = 6;
    } else {
      this.defaultPercentAdjustmentSelect = 8;
    }

    this.createForm.patchValue({
        id: this.local_data.id,
        tdNo: this.local_data.tdNo,
        owner: this.local_data.owner,
        address: this.local_data.address,
        street: this.local_data.street,
        barangay: this.local_data.barangay,
        municipality: this.local_data.municipality,
        province: this.local_data.province,
        propertyIdentificationNo: this.local_data.propertyIdentificationNo,
        arpNo: this.local_data.arpNo,
        tinNo: this.local_data.tinNo,
        telephoneNo: this.local_data.telephoneNo,
        octTctCloaNo: this.local_data.octTctCloaNo,
        octNo: this.local_data.octNo,
        dated: this.local_data.dated,
        surveyLotNo: this.local_data.surveyLotNo,
        assessorLotNo: this.local_data.assessorLotNo,
        blkNo: this.local_data.blkNo,
        boundary: this.local_data.boundary, // Boundary Object
        kindOfPropertyAssessed: this.local_data.kindOfPropertyAssessed,
        noOfStoreys: this.local_data.noOfStoreys,
        briefDescription: this.local_data.briefDescription,
        specify: this.local_data.specify,
        kindOfProperties: this.local_data.kindOfProperties, // Kind of Properties Object Array
        totalAssessedValueInWord: this.local_data.totalAssessedValueInWord,
        taxableExempt: this.local_data.taxableExempt,
        quarter: this.quarter,
        year: this.year,
        recommendedBy: this.local_data.recommendedBy,
        approvedBy: this.local_data.approvedBy,
        date: this.today,
        declarationCancels: this.local_data.declarationCancels,
        ownerTdNoCancels: this.local_data.ownerTdNoCancels,
        previousAssessedValue: this.copiedPreviousAssessedValue, // Previous Assessed Value - change to solve
        memoranda: this.local_data.memoranda,
        approvedMessage: this.local_data.approvedMessage,
        notes: this.local_data.notes,
        defaultPercentAdjustmentSelect: this.defaultPercentAdjustmentSelect
      });
  }

  get kindOfProperties() {
    return this.createForm.get('kindOfProperties') as FormArray;
  }

  createKindOfProperties(id: number) {
    // check id only
    var index = this.local_data.kindOfProperties.findIndex((item: IKindOfProperty) => item.taxDecOfRealPropertyId === id);
  
    if (index > -1) {
      for (let kindOfProperty of this.local_data.kindOfProperties) {
        if (kindOfProperty.id !== id) {
          this.kindOfProperties.push(
            this.fb.group({
              id: kindOfProperty.id,
              kindOfLands: kindOfProperty.kindOfLands,
              classification: kindOfProperty.classification,
              area: kindOfProperty.area,
              marketValue: kindOfProperty.marketValue,
              actualUse: kindOfProperty.actualUse,
              level: kindOfProperty.level,
              assessedValue: kindOfProperty.assessedValue,
              agriculturalLandId: kindOfProperty.agriculturalLandId,
              commercialLandId: kindOfProperty.commercialLandId,
              industrialLandId: kindOfProperty.industrialLandId,
              residentialLandId: kindOfProperty.residentialLandId,
              taxDecOfRealPropertyId: kindOfProperty.taxDecOfRealPropertyId
          }));
        }
      }
    } else {
      this.local_data.kindOfProperties.push(id);
    }
  }

  loadIndividualRevise(id: number) {
    this.realPropertyService.getRealPropertyReviseWithId(id).subscribe((response) => {
      this.local_data = response;
      
      this.getAdjustedMarketValue();
      this.getAssessedValue();

      this.createKindOfProperties(response.id);
    }, error => {
      this.notifierService.showNotification(`Problem loading the individual revise data. ${error.errors}`, 'OK', 'error');
    });
  }

  onSubmit() {
    this.realPropertyService.createRealProperty(this.createForm.value).subscribe(() => {
      
      this.notifierService.showNotification(`${this.createForm.get('owner')?.value} has been revised successfully.`, 'OK', 'success');

      console.log(this.createForm.value);
    }, error => {
      this.notifierService.showNotification(`Problem saving the revise data. ${error.errors}`, 'OK', 'error');
    });
  }

  onPercentAdjustmentSelected(event: MatSelectChange) {
    this.defaultPercentAdjustmentSelect = event.value;
  }

  convertPercentToDecimal(percent: number) {
    return percent/100;
  }

  roundOffToTheNearestTens(number: number) {
    return Math.round(number/10) * 10;
  }

  getTotalPercentAdjustment() {
    return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + this.defaultPercentAdjustmentSelect, 0);
  }

  getTotalValueAdjustment() {
    if (this.defaultPercentAdjustmentSelect === 8) {
      return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + (curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)) * this.convertPercentToDecimal(8), 0);
    }

    if (this.defaultPercentAdjustmentSelect === 6) {
      return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + (curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)) * this.convertPercentToDecimal(6), 0);
    }
  }

  getTotalAdjustedMarketValue() {
    if (this.defaultPercentAdjustmentSelect === 8) {
      return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + (curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)) - ((curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)) * this.convertPercentToDecimal(8)), 0);
    }

    if (this.defaultPercentAdjustmentSelect === 6) {
      return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + (curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)) + ((curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)) * this.convertPercentToDecimal(6)), 0);
    }
  }

  getAdjustedMarketValue() {
    // Barangay Poblacion +6%
    if (this.local_data.barangay === 'poblacion') {
      for(let kindOfProperty of this.local_data.kindOfProperties) {
        kindOfProperty.marketValue = this.roundOffToTheNearestTens((kindOfProperty.area * (kindOfProperty.marketValueAgri || kindOfProperty.marketValueComm || kindOfProperty.marketValueIndu || kindOfProperty.marketValueResi)) + ((kindOfProperty.area * (kindOfProperty.marketValueAgri || kindOfProperty.marketValueComm || kindOfProperty.marketValueIndu || kindOfProperty.marketValueResi)) * this.convertPercentToDecimal(6)));
      }
    } else {
      for(let kindOfProperty of this.local_data.kindOfProperties) {
        kindOfProperty.marketValue = this.roundOffToTheNearestTens((kindOfProperty.area * (kindOfProperty.marketValueAgri || kindOfProperty.marketValueComm || kindOfProperty.marketValueIndu || kindOfProperty.marketValueResi)) - ((kindOfProperty.area * (kindOfProperty.marketValueAgri || kindOfProperty.marketValueComm || kindOfProperty.marketValueIndu || kindOfProperty.marketValueResi)) * this.convertPercentToDecimal(8)));
      }
    }
  }

  getTotalAssessmentLevel() {
    return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + curr.level, 0);
  }

  getTotalAssessedValue() {
    if (this.defaultPercentAdjustmentSelect === 8) {
      return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + this.roundOffToTheNearestTens(this.roundOffToTheNearestTens((curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)) - ((curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)) * this.convertPercentToDecimal(8))) * this.convertPercentToDecimal(curr.level)), 0);
    }

    if (this.defaultPercentAdjustmentSelect === 6) {
      return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + this.roundOffToTheNearestTens(this.roundOffToTheNearestTens((curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)) + ((curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)) * this.convertPercentToDecimal(6))) * this.convertPercentToDecimal(curr.level)), 0);
    }
  }

  getAssessedValue() {
    if (this.local_data.barangay === 'poblacion') {
      for(let kindOfProperty of this.local_data.kindOfProperties) {
        kindOfProperty.assessedValue = this.roundOffToTheNearestTens(this.roundOffToTheNearestTens((kindOfProperty.area * (kindOfProperty.marketValueAgri || kindOfProperty.marketValueComm || kindOfProperty.marketValueIndu || kindOfProperty.marketValueResi)) + ((kindOfProperty.area * (kindOfProperty.marketValueAgri || kindOfProperty.marketValueComm || kindOfProperty.marketValueIndu || kindOfProperty.marketValueResi)) * this.convertPercentToDecimal(6))) * this.convertPercentToDecimal(kindOfProperty.level));
      }
    } else {
      for(let kindOfProperty of this.local_data.kindOfProperties) {
        kindOfProperty.assessedValue = this.roundOffToTheNearestTens(this.roundOffToTheNearestTens((kindOfProperty.area * (kindOfProperty.marketValueAgri || kindOfProperty.marketValueComm || kindOfProperty.marketValueIndu || kindOfProperty.marketValueResi)) - ((kindOfProperty.area * (kindOfProperty.marketValueAgri || kindOfProperty.marketValueComm || kindOfProperty.marketValueIndu || kindOfProperty.marketValueResi)) * this.convertPercentToDecimal(8))) * this.convertPercentToDecimal(kindOfProperty.level));
      }
    }
  }

  getTotalPreviousAssessedValue() {
    return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + curr.assessedValue, 0);
  }

  getTotalArea() {
    return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + curr.area, 0);
  }

  getTotalUnitValue() {
    return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi), 0);
  }

  getTotalMarketValue() {
    return this.local_data.kindOfProperties?.reduce((accum: any, curr: any) => accum + (curr.area * (curr.marketValueAgri || curr.marketValueComm || curr.marketValueIndu || curr.marketValueResi)), 0);
  }

  getStaffs() {
    this.adminService.getStaffs(this.staffParams).subscribe(response => {
      this.staffs = response!.data;

      // Find the specific assessor staff
      this.assessor = this.staffs.find(staff => staff.designation == 'assessor');

      // Find the specific provincial assessor staff
      this.provincialAssessor = this.staffs.find(staff => staff.designation == 'provincial-assessor');

      // Find the staffs with a designation of staff
      this.staffsFilter = this.staffs.filter(staff => staff.designation == 'staff');

      // Find the 1st value of staffsFilter
      this.staffDefault = this.staffsFilter[0];
    }, error => {
      this.notifierService.showNotification(`Problem loading the staffs. ${error.errors}`, 'OK', 'error');
    });
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
