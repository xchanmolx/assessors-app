import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/account/account.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmSingleUseLandComponent } from 'src/app/shared/components/dialogs/confirm-single-use-land/confirm-single-use-land.component';
import { IMergeOfLands } from 'src/app/shared/models/mergeOfLands';
import { RealPropertyService } from '../../real-property.service';

@Component({
  selector: 'app-single-use-land',
  templateUrl: './single-use-land.component.html',
  styleUrls: ['./single-use-land.component.scss']
})
export class SingleUseLandComponent implements OnInit {
  @Input() realPropMergeOfLands!: IMergeOfLands[];
  @Input() totalCount: number = 0;

  displayedColumns: string[] = ['propertyLocation', 'currentMarketValue', 'currentAssessedValue',
   'previousMarketValue', 'previousAssessedValue', 'area', 'rpus', 'actions'];

  constructor(private realPropertyService: RealPropertyService, private accountService: AccountService,
    public dialog: MatDialog, private notifierService: NotifierService) {

  }

  ngOnInit(): void {
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmSingleUseLandComponent, {
      data: obj,
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        this.updateRowData(result.data);
      }
    });
  }

  updateRowData(row_obj: IMergeOfLands) {
    this.realPropMergeOfLands = this.realPropMergeOfLands.filter((value, key) => {
      if (value.propertyLocation == row_obj.propertyLocation) {
        value.propertyLocation = row_obj.propertyLocation;
        value.currentMarketValue = row_obj.currentMarketValue;
        value.currentAssessedValue = row_obj.currentAssessedValue;
        value.previousMarketValue = row_obj.previousMarketValue;
        value.previousAssessedValue = row_obj.previousAssessedValue;
        value.area = row_obj.area;
        value.rpus = row_obj.rpus;        
      }

      return true;
    });
  }

  getTotalCurrentMarketValue() {
    return this.realPropMergeOfLands.map(t => (t.currentMarketValue)).reduce((acc, value) => acc + value, 0);
  }

  getTotalCurrentAssessedValue() {
    return this.realPropMergeOfLands.map(t => (t.currentAssessedValue)).reduce((acc, value) => acc + value, 0);
  }

  getTotalPreviousMarketValue() {
    return this.realPropMergeOfLands.map(t => (t.previousMarketValue)).reduce((acc, value) => acc + value, 0);
  }

  getTotalPreviousAssessedValue() {
    return this.realPropMergeOfLands.map(t => (t.previousAssessedValue)).reduce((acc, value) => acc + value, 0);
  }

  getTotalArea() {
    return this.realPropMergeOfLands.map(t => (t.area)).reduce((acc, value) => acc + value, 0);
  }

  getTotalRpus() {
    return this.realPropMergeOfLands.map(t => (t.rpus)).reduce((acc, value) => acc + value, 0);
  }

}
