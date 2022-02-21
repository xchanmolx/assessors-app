import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { IMergeOfLands } from 'src/app/shared/models/mergeOfLands';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-single-use-land',
  templateUrl: './single-use-land.component.html',
  styleUrls: ['./single-use-land.component.scss']
})
export class SingleUseLandComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) table!: ElementRef;
  @Input() realPropMergeOfLands!: IMergeOfLands[];
  @Input() totalCount: number = 0;
  @Input() defaultKindOfLand!: string;
  @Input() defaultLatestYear!: any;
  @Input() defaultOldYear!: any;

  displayedColumns: string[] = ['barangay', 'currentMarketValue', 'currentAssessedValue',
   'previousMarketValue', 'previousAssessedValue', 'area', 'rpus'];

  constructor(private accountService: AccountService) {

  }

  ngOnInit(): void {
  }

  exportAsExcel() {
    let sheetName = `${this.defaultKindOfLand}_${this.defaultLatestYear}-${this.defaultOldYear}`;
    let fileName = `${this.defaultKindOfLand}_${this.defaultLatestYear}-${this.defaultOldYear}.xlsx`;

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement); //converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  loggedIn() {
    return this.accountService.loggedIn();
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
