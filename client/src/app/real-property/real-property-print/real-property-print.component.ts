import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { AdminService } from 'src/app/admin/admin.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { KindOfLandsService } from 'src/app/kind-of-lands/kind-of-lands.service';
import { IBarangay } from 'src/app/shared/models/barangay';
import { BarangayParams } from 'src/app/shared/models/barangayParams';
import { IKindOfProperty } from 'src/app/shared/models/kindOfProperty';
import { ILogo } from 'src/app/shared/models/logo';
import { IMergeYears } from 'src/app/shared/models/mergeYears';
import { IMunicipalityCityDistrict } from 'src/app/shared/models/municipalityCityDistrict';
import { MunicipalityCityDistrictParams } from 'src/app/shared/models/municipalityCityDistrictParams';
import { IProvince } from 'src/app/shared/models/province';
import { ProvinceParams } from 'src/app/shared/models/provinceParams';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { RealPropertyParams } from 'src/app/shared/models/realPropertyParams';
import { IStaff } from 'src/app/shared/models/staff';
import { StaffParams } from 'src/app/shared/models/staffParams';
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
  staffs: IStaff[] = [];
  staffParams = new StaffParams();
  assessor!: IStaff | undefined;
  staffsFilter!: IStaff[] | undefined;
  staffDefault!: IStaff | undefined;
  municipalityCityDistricts: IMunicipalityCityDistrict[] = [];
  municipalityCityDistrictParams = new MunicipalityCityDistrictParams();
  municipality!: IMunicipalityCityDistrict | undefined;
  city!: IMunicipalityCityDistrict | undefined;
  district!: IMunicipalityCityDistrict | undefined;
  provinces: IProvince[] = [];
  provinceParams = new ProvinceParams();
  province!: IProvince;
  logos: ILogo[] = [];
  logo1st!: ILogo | undefined;

  displayedColumns: string[] = ['classification', 'area', 'marketValue', 'actualUse', 'level', 'assessedValue'];

  constructor(private realPropertyService: RealPropertyService, private notifierService: NotifierService,
    private kindOfLandsService: KindOfLandsService, private adminService: AdminService) {
      this.getBarangays();
      this.getMergeYears();
      this.getRealProperties();
      this.getStaffs();
      this.getMunicipalityCityDistricts();
      this.getProvinces();
      this.getLogos();
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

  getStaffs() {
    this.adminService.getStaffs(this.staffParams).subscribe(response => {
      this.totalCount = response!.count;
      this.staffs = response!.data;

      // Find the specific staff
      this.assessor = this.staffs.find(staff => staff.designation == 'assessor');

      // Find the staffs with a designation of staff
      this.staffsFilter = this.staffs.filter(staff => staff.designation == 'staff');

      // Find the 1st value of staffsFilter
      this.staffDefault = this.staffsFilter[0];
    }, error => {
      this.notifierService.showNotification(`Problem loading the staffs. ${error.errors}`, 'OK', 'error');
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
      this.notifierService.showNotification(`Problem loading the municipalities / cities / districts. ${error.errors}`, 'OK', 'error');
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

  getLogos() {
    this.adminService.getLogos().subscribe(response => {
      this.logos = response;

      // Find the specific 1st logo
      this.logo1st = this.logos.find(logo => logo.ordinal == 'logo1st');
    }, error => {
      this.notifierService.showNotification(`Problem loading the logos. ${error.errors}`, 'OK', 'error');
    });
  }

  getTotalArea(kindOfProperties: IKindOfProperty[]) {
    return kindOfProperties.reduce((acc, kindProperty) => acc + kindProperty.area, 0);
  }

  getTotalMarketValue(kindOfProperties: IKindOfProperty[]) {
    return kindOfProperties.reduce((acc, kindProperty) => acc + kindProperty.marketValue, 0);
  }

  getTotalLevel(kindOfProperties: IKindOfProperty[]) {
    return kindOfProperties.reduce((acc, kindProperty) => acc + kindProperty.level, 0);
  }

  getTotalAssessedValue(kindOfProperties: IKindOfProperty[]) {
    return kindOfProperties.reduce((acc, kindProperty) => acc + kindProperty.assessedValue, 0);
  }
}
