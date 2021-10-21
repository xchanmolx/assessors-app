import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/account/account.service';
import { BusyService } from 'src/app/core/services/busy.service';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { RealPropertyParams } from 'src/app/shared/models/realPropertyParams';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-real-property-assessment-roll',
  templateUrl: './real-property-assessment-roll.component.html',
  styleUrls: ['./real-property-assessment-roll.component.scss']
})
export class RealPropertyAssessmentRollComponent implements OnInit, AfterViewInit {
  @ViewChild('effectiveYear', { static: false }) effectiveYearTerm!: ElementRef;
  realProperties: IRealProperty[] = [];
  realPropertyParams = new RealPropertyParams();
  totalCount: number = 0;
  totalAssessedValue: number = 0;
  totalPrevAssessedValue: number = 0;
  yearInput!: string;
  defaultPageSize = 300000;
  defaultTaxableSelect = 'taxable';
  taxableExemptOptions = [
    { name: 'Taxable', value: 'taxable' },
    { name: 'Exempt', value: 'exempt'}
  ];
  defaultAngilanSelect = 'angilan';
  barangayOptions = [
    { name: 'Angilan', value: 'angilan' },
    { name: 'Bojo', value: 'bojo'},
    { name: 'Bonbon', value: 'bonbon'},
    { name: 'Esperanza', value: 'esperanza'},
    { name: 'Kandingan', value: 'kandingan'},
    { name: 'Kantabogon', value: 'kantabogon'},
    { name: 'Kawasan', value: 'kawasan'},
    { name: 'Olango', value: 'olango'},
    { name: 'Poblacion', value: 'poblacion'},
    { name: 'Punay', value: 'punay'},
    { name: 'Rosario', value: 'rosario'},
    { name: 'Saksak', value: 'saksak'},
    { name: 'Tampaan', value: 'tampaan'},
    { name: 'Toyokon', value: 'toyokon'},
    { name: 'Zaragosa', value: 'zaragosa'},
  ];

  displayedColumns: string[] = ['ownerName', 'propertyIndex', 'taxDecNumber', 'arpNumber', 'ownerAddress',
   'kind', 'class', 'propertyLocation', 'assessedValue', 'previousTDNumber', 'previousAV', 'effectiveYear'];
  showFirstLastButtons = true;

  constructor(private realPropertyService: RealPropertyService, 
    public busyService: BusyService, private cd: ChangeDetectorRef, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getRealPropertiesAssessmentRoll();
  }

  ngAfterViewInit() {
    this.busyService.idle();
    this.cd.detectChanges();
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  getRealPropertiesAssessmentRoll() {
    this.realPropertyParams.pageSize = this.defaultPageSize;
    this.realPropertyParams.taxableExempt = this.defaultTaxableSelect;
    this.realPropertyParams.propertyLocation = this.defaultAngilanSelect;

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
    this.realPropertyParams.effectiveYear = this.effectiveYearTerm.nativeElement.value;
    this.getRealPropertiesAssessmentRoll();
  }

  onReset() {
    this.effectiveYearTerm.nativeElement.value = '';
    this.yearInput = '';
    this.realPropertyParams = new RealPropertyParams();
    this.getRealPropertiesAssessmentRoll();
  }

}
