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

  defaultPercentAdjustmentSelect!: number;
  percentAdjustmentOptions = [
    { name: '- 8%', value: 0.08 },
    { name: '+ 6%', value: 0.06 }
  ];

  displayedColumns: string[] = ['kindOfLands', 'classification', 'area',
    'actualUse', 'marketValueLands', 'marketValue'];

  displayedColumns2: string[] = ['marketValue', 'adjustmentFactor', 'percentAdjustment', 'valueAdjustment', 'adjustedMarketValue'];

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
      this.defaultPercentAdjustmentSelect = 0.06;
    } else {
      this.defaultPercentAdjustmentSelect = 0.08;
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
