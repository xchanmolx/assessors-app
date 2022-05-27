import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { KindOfLandsService } from 'src/app/kind-of-lands/kind-of-lands.service';
import { IBarangay } from 'src/app/shared/models/barangay';
import { BarangayParams } from 'src/app/shared/models/barangayParams';
import { IMergeYears } from 'src/app/shared/models/mergeYears';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { RealPropertyParams } from 'src/app/shared/models/realPropertyParams';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-real-property-print',
  templateUrl: './real-property-print.component.html',
  styleUrls: ['./real-property-print.component.scss']
})
export class RealPropertyPrintComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  realProperties: IRealProperty[] = [];
  realPropertyParams = new RealPropertyParams();
  totalCount: number = 0;
  barangays: IBarangay[] = [];
  barangayParams = new BarangayParams();
  defaultBarangaySelect: any;
  mergeYears: IMergeYears[] = [];
  defaultLatestYear: any;
  showFirstLastButtons = true;

  constructor(private realPropertyService: RealPropertyService, private notifierService: NotifierService,
    private kindOfLandsService: KindOfLandsService) {
      this.getBarangays();
      this.getMergeYears();
      this.getRealProperties();
  }

  ngOnInit(): void {
  }

  getRealProperties() {
    this.realPropertyService.getRealProperties(this.realPropertyParams).subscribe(response => {
      this.realProperties = response!.data;
      this.realPropertyParams.pageNumber = response!.pageIndex;
      this.realPropertyParams.pageSize = response!.pageSize;
      this.totalCount = response!.count;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the data.`, 'OK', 'error');
    });
  }

  onSearch() {
    this.realPropertyParams.search = this.searchTerm.nativeElement.value;
    this.getRealProperties();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.realPropertyParams = new RealPropertyParams();
    this.getRealProperties();
  }

  onPageChanged(event: PageEvent) {
    this.realPropertyParams.pageNumber = event.pageIndex+1;

    if (this.realPropertyParams.pageSize !== event.pageSize) {
      this.realPropertyParams.pageSize = event.pageSize;
    }

    this.getRealProperties();
  }

  onBarangaySelected(event: MatSelectChange) {
    this.realPropertyParams.barangay = event.value;
    this.getRealProperties();
  }

  onLatestYearSelected(event: MatSelectChange) {
    this.realPropertyParams.year = event.value;
    this.getRealProperties();
  }

  getBarangays() {
    this.kindOfLandsService.getBarangays(this.barangayParams).subscribe((response) => {
      this.barangays = response!.data;

      // First element or index of barangays array
      var firstBarangay = this.barangays.find(x => x.name !== undefined);

      this.defaultBarangaySelect = firstBarangay?.name;

      this.getRealProperties();
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the barangays.`, 'OK', 'error');
    });
  }

  getMergeYears() {
    this.realPropertyService.getMergeYears().subscribe(response => {
      this.mergeYears = response;
      
      // Get the max year value in an array
      var maxYear = Math.max.apply(Math, this.mergeYears.map(function(y) {return y.year}));

      this.defaultLatestYear = maxYear;

      this.getRealProperties();
    }, error => {
      this.notifierService.showNotification(`Problem loading the merge years. ${error.errors}`, 'OK', 'error');
    });
  }
}
