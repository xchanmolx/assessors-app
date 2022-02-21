import { Component, Input, OnInit } from '@angular/core';
import { IMergeOfLandsMixUse } from 'src/app/shared/models/mergeOfLandsMixUse';

@Component({
  selector: 'app-mix-use-land',
  templateUrl: './mix-use-land.component.html',
  styleUrls: ['./mix-use-land.component.scss']
})
export class MixUseLandComponent implements OnInit {
  @Input() realPropMergeOfLandsMixUse!: IMergeOfLandsMixUse[];
  @Input() totalCount: number = 0;

  displayedColumns: string[] = ['tdNo', 'barangay', 'kindOfProperties.kindOfLands', 
    'kindOfProperties.marketValue', 'kindOfProperties.assessedValue', 'kindOfProperties.area', 'previousAssessedValue', 'year'];

  constructor() { }

  ngOnInit(): void {
  }

}
