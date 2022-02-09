import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IMergeOfLands } from 'src/app/shared/models/mergeOfLands';
import { RealPropertyParams } from 'src/app/shared/models/realPropertyParams';
import { RealPropertyService } from '../../real-property.service';

@Component({
  selector: 'app-single-use-land',
  templateUrl: './single-use-land.component.html',
  styleUrls: ['./single-use-land.component.scss']
})
export class SingleUseLandComponent implements OnInit {
  totalCount: number = 0;
  realPropMergeOfLands: IMergeOfLands[] = [];
  realPropertyParams = new RealPropertyParams();
  defaultKindOfLand = 'agricultural';
  kindOfLandsOptions = [
    { name: 'Agricultural', value: 'agricultural'},
    { name: 'Commercial', value: 'commercial'},
    { name: 'Industrial', value: 'industrial'},
    { name: 'Residential', value: 'residential'}
  ];
  displayedColumns: string[] = ['propertyLocation', 'currentMarketValue', 'currentAssessedValue',
   'previousMarketValue', 'previousAssessedValue', 'area', 'rpus'];

  constructor(private realPropertyService: RealPropertyService, private notifierService: NotifierService) {
    this.getRealPropertiesSingleUseLand();
  }

  ngOnInit(): void {
  }

  getRealPropertiesSingleUseLand() {
    this.realPropertyService.getRealPropertiesSingleUseLand(this.realPropertyParams).subscribe(response => {
      this.realPropMergeOfLands = response!.data;
      this.totalCount = response!.count;
    }, error => {
      this.notifierService.showNotification(`Problem loading the data. ${error.errors}`, 'OK', 'error');
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
