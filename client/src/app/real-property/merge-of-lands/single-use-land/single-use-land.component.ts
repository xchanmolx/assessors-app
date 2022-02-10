import { Component, Input, OnInit } from '@angular/core';
import { IMergeOfLands } from 'src/app/shared/models/mergeOfLands';

@Component({
  selector: 'app-single-use-land',
  templateUrl: './single-use-land.component.html',
  styleUrls: ['./single-use-land.component.scss']
})
export class SingleUseLandComponent implements OnInit {
  @Input() realPropMergeOfLands!: IMergeOfLands[];
  @Input() totalCount: number = 0;

  displayedColumns: string[] = ['propertyLocation', 'currentMarketValue', 'currentAssessedValue',
   'previousMarketValue', 'previousAssessedValue', 'area', 'rpus'];

  constructor() {
  }

  ngOnInit(): void {
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
