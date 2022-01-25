import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/account/account.service';
import { AdminService } from 'src/app/admin/admin.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { KindOfLandsService } from 'src/app/kind-of-lands/kind-of-lands.service';
import { IBarangay } from 'src/app/shared/models/barangay';
import { BarangayParams } from 'src/app/shared/models/barangayParams';
import { IMunicipalityCityDistrict } from 'src/app/shared/models/municipalityCityDistrict';
import { MunicipalityCityDistrictParams } from 'src/app/shared/models/municipalityCityDistrictParams';
import { IProvince } from 'src/app/shared/models/province';
import { ProvinceParams } from 'src/app/shared/models/provinceParams';
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
  totalCountBara: number = 0;
  barangayParams = new BarangayParams();
  defaultBarangaySelect!: string;
  maxYear!: number;
  municipalityCityDistricts: IMunicipalityCityDistrict[] = [];
  municipalityCityDistrictParams = new MunicipalityCityDistrictParams();
  municipality!: IMunicipalityCityDistrict | undefined;
  city!: IMunicipalityCityDistrict | undefined;
  district!: IMunicipalityCityDistrict | undefined;
  provinces: IProvince[] = [];
  provinceParams = new ProvinceParams();
  province!: IProvince;

  displayedColumns: string[] = ['owner', 'propertyIndentificationNo', 'tdNo', 'arpNo', 'address',
   'kindOfPropertyAssessed', 'kindOfProperties.kindOfLands', 'propertyLocation', 'kindOfProperties.assessedValue', 'declarationCancels', 'previousAssessedValue', 'year'];
  showFirstLastButtons = true;

  constructor(private realPropertyService: RealPropertyService, private accountService: AccountService,
    private notifierService: NotifierService, private kindOfLandsService: KindOfLandsService,
    private adminService: AdminService) {
    this.getRealPropertiesAssessmentRoll();
    this.getBarangays();
    this.getMunicipalityCityDistricts();
    this.getProvinces();
  }

  ngOnInit(): void {
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  getRealPropertiesAssessmentRoll() {
    this.realPropertyParams.sort = "yearDesc";
    this.realPropertyParams.year = this.maxYear;
    this.realPropertyParams.propertyLocation = this.defaultBarangaySelect;
    this.realPropertyParams.pageSize = this.defaultPageSize;
    this.realPropertyParams.taxableExempt = this.defaultTaxableSelect;

    this.realPropertyService.getRealProperties(this.realPropertyParams).subscribe(response => {
      this.realProperties = response!.data;
      this.realPropertyParams.pageNumber = response!.pageIndex;
      this.totalCount = response!.count;
      this.totalAssessedValue = response!.totalAssessedValue;
      this.totalPrevAssessedValue = response!.totalPrevAssessedValue;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the assessment roll data.`, 'OK', 'error');
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
    this.kindOfLandsService.getBarangays(this.barangayParams).subscribe((response) => {
      this.totalCountBara = response!.count;
      this.barangays = response!.data;

      // First element or index of barangays array
      this.defaultBarangaySelect = this.barangays[0].name;

      this.getMaxYear();
      this.getRealPropertiesAssessmentRoll();
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the barangays.`, 'OK', 'error');
    });
  }

  getMaxYear() {
    // First element or index of year array
    this.maxYear = this.safetyCheck(() => this.realProperties[0].year);
  }

  safetyCheck(fn: any) {
    try {
      return fn();
    } catch (error) {
      return undefined;
    }
  }

  getMunicipalityCityDistricts() {
    this.adminService.getMunicipalityCityDistricts(this.municipalityCityDistrictParams).subscribe(response => {
      this.municipalityCityDistricts = response!.data;

      // Find the specific municipality
      this.municipality = this.municipalityCityDistricts.find(mun => mun.level == 'municipality');

      // Find the specific city
      this.city = this.municipalityCityDistricts.find(city => city.level == 'city');

      // Find the specific district
      this.district = this.municipalityCityDistricts.find(dis => dis.level == 'district');
    }, error => {
      this.notifierService.showNotification(`Problem loading the municipalies / cities / districts. ${error.errors}`, 'OK', 'error');
    });
  }

  getProvinces() {
    this.adminService.getProvinces(this.provinceParams).subscribe(response => {
      this.provinces = response!.data;

      this.province = this.provinces[0];
    }, error => {
      this.notifierService.showNotification(`Problem loading the provinces. ${error.errors}`, 'OK', 'error');
    });
  }

}
