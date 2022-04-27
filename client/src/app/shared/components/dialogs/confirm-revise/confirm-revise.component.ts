import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { RealPropertyService } from 'src/app/real-property/real-property.service';
import { IRealProperty } from 'src/app/shared/models/realProperty';

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

  defaultPercentAdjustmentSelect!: number;
  percentAdjustmentOptions = [
    { name: '- 8%', value: 8 },
    { name: '+ 6%', value: 6 }
  ];

  displayedColumns: string[] = ['kindOfLands', 'classification', 'area',
    'actualUse', 'marketValueLands', 'marketValue'];

  displayedColumns2: string[] = ['marketValue', 'adjustmentFactor', 'percentAdjustment', 'valueAdjustment', 'adjustedMarketValue'];

  displayedColumns3: string[] = ['kind', 'actualUse', 'adjustedMarketValue', 'assessmentLevel', 'assessedValue'];

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IRealProperty, private realPropertyService: RealPropertyService,
  private notifierService: NotifierService, public dialogRef: MatDialogRef<ConfirmReviseComponent>) { 
    this.local_data = {...data};
    this.action = this.local_data.action;

    this.loadIndividualRevise();
  }

  ngOnInit(): void {
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

  loadIndividualRevise() {
    if (this.local_data.barangay === 'poblacion') {
      this.defaultPercentAdjustmentSelect = 6;
    } else {
      this.defaultPercentAdjustmentSelect = 8;
    }

    this.realPropertyService.getRealPropertyReviseWithId(this.local_data.id).subscribe(response => {
      this.local_data = response!;

      console.log(this.local_data);
    }, error => {
      this.notifierService.showNotification(`Problem loading the individual revise data. ${error.errors}`, 'OK', 'error');
    });
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
