import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IMunicipalityCityDistrict } from 'src/app/shared/models/municipalityCityDistrict';
import { MunicipalityCityDistrictParams } from 'src/app/shared/models/municipalityCityDistrictParams';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-municipality-city-district',
  templateUrl: './municipality-city-district.component.html',
  styleUrls: ['./municipality-city-district.component.scss']
})
export class MunicipalityCityDistrictComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  municipalityCityDistricts: IMunicipalityCityDistrict[] = [];
  municipalityCityDistrictParams = new MunicipalityCityDistrictParams();
  totalCount: number = 0;
  displayedColumns: string[] = ['name', 'level', 'actions'];

  constructor(public dialog: MatDialog, private adminService: AdminService,
    private notifierService: NotifierService) {
      this.getMunicipalityCityDistricts();
  }

  ngOnInit(): void {
  }

  getMunicipalityCityDistricts() {
    this.adminService.getMunicipalityCityDistricts(this.municipalityCityDistrictParams).subscribe(response => {
      this.totalCount = response!.count;
      this.municipalityCityDistricts = response!.data;
    }, error => {
      this.notifierService.showNotification(`Problem loading the municipality / city / district. ${error.errors}`, 'OK', 'error');
    });
  }

  

}
