import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/account/account.service';
import { AdminService } from 'src/app/admin/admin.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IMergeOfLands } from 'src/app/shared/models/mergeOfLands';
import { IMergeOfLandsMixUse } from 'src/app/shared/models/mergeOfLandsMixUse';
import { IMergeYears } from 'src/app/shared/models/mergeYears';
import { IMunicipalityCityDistrict } from 'src/app/shared/models/municipalityCityDistrict';
import { MunicipalityCityDistrictParams } from 'src/app/shared/models/municipalityCityDistrictParams';
import { IProvince } from 'src/app/shared/models/province';
import { ProvinceParams } from 'src/app/shared/models/provinceParams';
import { RealPropertyParams } from 'src/app/shared/models/realPropertyParams';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-merge-of-lands',
  templateUrl: './merge-of-lands.component.html',
  styleUrls: ['./merge-of-lands.component.scss']
})
export class MergeOfLandsComponent implements OnInit {
  totalCount: number = 0;
  totalCountMixUse: number = 0;
  realPropMergeOfLands: IMergeOfLands[] = [];
  realPropMergeOfLandsMixUse: IMergeOfLandsMixUse[] = [];
  realPropertyParams = new RealPropertyParams();
  defaultKindOfLand = 'agricultural';
  kindOfLandsOptions = [
    { name: 'Agricultural', value: 'agricultural'},
    { name: 'Commercial', value: 'commercial'},
    { name: 'Industrial', value: 'industrial'},
    { name: 'Residential', value: 'residential'}
  ];
  defaultSingleMixLand = 'single';
  singleMixOptions = [
    { name: 'Single Use of Land', value: 'single'},
    { name: 'Mix Use of Land', value: 'mix'}
  ];
  municipalityCityDistricts: IMunicipalityCityDistrict[] = [];
  municipalityCityDistrictParams = new MunicipalityCityDistrictParams();
  municipality!: IMunicipalityCityDistrict | undefined;
  city!: IMunicipalityCityDistrict | undefined;
  district!: IMunicipalityCityDistrict | undefined;
  provinces: IProvince[] = [];
  provinceParams = new ProvinceParams();
  province!: IProvince;
  mergeYears: IMergeYears[] = [];
  defaultLatestYear: any;
  defaultOldYear: any;

  constructor(private realPropertyService: RealPropertyService, private notifierService: NotifierService,
      private accountService: AccountService, private adminService: AdminService) { 
    this.getRealPropertiesSingleUseLand();
    this.getMunicipalityCityDistricts();
    this.getProvinces();
    this.getMergeYears();
    this.getRealPropertiesMixUseLand();
  }

  ngOnInit(): void {
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  onKindOfLandSelected(event: MatSelectChange) {
    this.realPropertyParams.kindOfLand = event.value;
    this.getRealPropertiesSingleUseLand();
  }

  onLatestYearSelected(event: MatSelectChange) {
    this.realPropertyParams.year = event.value;
    this.getRealPropertiesSingleUseLand();
  }

  onOldYearSelected(event: MatSelectChange) {
    this.realPropertyParams.yearTwo = event.value;
    this.getRealPropertiesSingleUseLand();
  }

  onSingleMixLandSelected(event: MatSelectChange) {
    this.defaultSingleMixLand = event.value;
  }

  getMergeYears() {
    this.realPropertyService.getMergeYears().subscribe(response => {
      this.mergeYears = response;
      
      // Get the max year value in an array
      var maxYear = Math.max.apply(Math, this.mergeYears.map(function(y) {return y.year}));
      
      // Get the two biggest year value in an array
      var twoBiggestYear = this.mergeYears.sort((x, y) => y.year - x.year).slice(0, 2);

      // Get the min year value in an array
      var minYear = Math.min.apply(Math, twoBiggestYear.map(function(y) {return y.year}));

      this.defaultLatestYear = maxYear;
      this.defaultOldYear = minYear;
      
      this.getRealPropertiesSingleUseLand();
    }, error => {
      this.notifierService.showNotification(`Problem loading the merge years. ${error.errors}`, 'OK', 'error');
    });
  }

  getRealPropertiesSingleUseLand() {
    this.realPropertyParams.year = this.defaultLatestYear;
    this.realPropertyParams.yearTwo = this.defaultOldYear;
    this.realPropertyParams.kindOfLand = this.defaultKindOfLand;
    
    this.realPropertyService.getRealPropertiesSingleUseLand(this.realPropertyParams).subscribe(response => {
      this.realPropMergeOfLands = response!.data;
      this.totalCount = response!.count;
    }, error => {
      this.notifierService.showNotification(`Problem loading the data. ${error.errors}`, 'OK', 'error');
    });
  }
  
  getRealPropertiesMixUseLand() {
    this.realPropertyService.getRealPropertiesMixUseLands().subscribe(response => {
      this.realPropMergeOfLandsMixUse = response.data;
      this.totalCountMixUse = response.count;
    }, error => {
      this.notifierService.showNotification(`Problem loading the data. ${error.errors}`, 'OK', 'error');
    });
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
