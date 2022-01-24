import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { NotifierService } from '../core/services/notifier.service';
import { IMunicipalityCityDistrict } from '../shared/models/municipalityCityDistrict';
import { MunicipalityCityDistrictParams } from '../shared/models/municipalityCityDistrictParams';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  name!: string;
  bullets = [
    {
      name: 'Tax Mapping Services'
    },
    {
      name: 'Real Property Appraisal Services'
    },
    {
      name: 'Real Property Records Services'
    }
  ];
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
