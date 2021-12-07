import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/account/account.service';
import { IBarangay } from 'src/app/shared/models/barangay';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { RealPropertyParams } from 'src/app/shared/models/realPropertyParams';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-real-property-assessment-roll',
  templateUrl: './real-property-assessment-roll.component.html',
  styleUrls: ['./real-property-assessment-roll.component.scss']
})
export class RealPropertyAssessmentRollComponent implements OnInit {
  realProperties: IRealProperty[] = [];
  realPropertyParams = new RealPropertyParams();
  totalCount: number = 0;
  totalAssessedValue: number = 0;
  totalPrevAssessedValue: number = 0;
  defaultPageSize = 300000;
  defaultTaxableSelect = 'taxable';
  taxableExemptOptions = [
    { name: 'Taxable', value: 'taxable' },
    { name: 'Exempt', value: 'exempt'}
  ];
  barangays: IBarangay[] = [];
  defaultBarangaySelect!: string;
  maxYear!: number;

  displayedColumns: string[] = ['owner', 'propertyIndentificationNo', 'tdNo', 'arpNo', 'address',
   'kindOfPropertyAssessed', 'kindOfProperties.kindOfLands', 'propertyLocation', 'kindOfProperties.assessedValue', 'declarationCancels', 'previousAssessedValue', 'year'];
  showFirstLastButtons = true;

  constructor(private realPropertyService: RealPropertyService, private accountService: AccountService) {
    this.getRealPropertiesAssessmentRoll();
    this.getBarangays();
  }

  ngOnInit(): void {
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  getRealPropertiesAssessmentRoll() {
    this.realPropertyParams.pageSize = this.defaultPageSize;
    this.realPropertyParams.taxableExempt = this.defaultTaxableSelect;
    this.realPropertyParams.propertyLocation = this.defaultBarangaySelect;
    this.realPropertyParams.sort = "yearDesc";

    this.realPropertyService.getRealProperties(this.realPropertyParams).subscribe(response => {
      this.realProperties = response!.data;
      this.realPropertyParams.pageNumber = response!.pageIndex;
      this.totalCount = response!.count;
      this.totalAssessedValue = response!.totalAssessedValue;
      this.totalPrevAssessedValue = response!.totalPrevAssessedValue;
    }, error => {
      console.log(error.errors);
    });
  }

  onTaxableExemptSelected(event: MatSelectChange) {
    this.realPropertyParams.taxableExempt = event.value;
    this.getRealPropertiesAssessmentRoll();
  }

  onBarangaySelected(event: MatSelectChange) {
    this.realPropertyParams.propertyLocation = event.value;
    this.getRealPropertiesAssessmentRoll();
  }

  onEffectiveYear() {
    this.realPropertyParams.year = this.maxYear;
    this.getRealPropertiesAssessmentRoll();
  }

  onReset() {
    this.maxYear = 0;
    this.realPropertyParams = new RealPropertyParams();
    this.getRealPropertiesAssessmentRoll();
  }

  getBarangays() {
    this.realPropertyService.getBarangays().subscribe((barangays) => {
      this.barangays = barangays;

      // First element or index of barangays array
      this.defaultBarangaySelect = this.barangays[0].name;

      // First element or index of year array
      this.maxYear = this.realProperties[0].year;

      // Pass latest year params
      this.realPropertyParams.year = this.maxYear;

      this.getRealPropertiesAssessmentRoll();
    }, error => {
      console.log(error);
    });
  }
}
