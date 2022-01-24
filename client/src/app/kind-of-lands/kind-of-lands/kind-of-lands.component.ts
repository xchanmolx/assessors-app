import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IMunicipalityCityDistrict } from 'src/app/shared/models/municipalityCityDistrict';
import { MunicipalityCityDistrictParams } from 'src/app/shared/models/municipalityCityDistrictParams';

@Component({
  selector: 'app-kind-of-lands',
  templateUrl: './kind-of-lands.component.html',
  styleUrls: ['./kind-of-lands.component.scss']
})
export class KindOfLandsComponent implements OnInit {
  municipalityCityDistricts: IMunicipalityCityDistrict[] = [];
  municipalityCityDistrictParams = new MunicipalityCityDistrictParams();
  municipality!: IMunicipalityCityDistrict | undefined;
  city!: IMunicipalityCityDistrict | undefined;
  district!: IMunicipalityCityDistrict | undefined;

  constructor(private notifierService: NotifierService, private adminService: AdminService) { 
    this.getMunicipalityCityDistricts();
  }
  
  ngOnInit(): void {
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
  
}
