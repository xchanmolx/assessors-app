import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmMunicipalityCityDistrictComponent } from 'src/app/shared/components/dialogs/confirm-municipality-city-district/confirm-municipality-city-district.component';
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

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmMunicipalityCityDistrictComponent, {
      data: obj,
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event == 'Add') {
        this.addRowData(result.data);
      }
    });
  }

  addRowData(row_obj: IMunicipalityCityDistrict) {
    this.adminService.createMunicipalityCityDistrict(row_obj).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been added successfully.`, 'OK', 'success');
      this.getMunicipalityCityDistricts();
    }, error => {
      this.notifierService.showNotification(`Problem adding the municipality / city / district. ${error.errors}`, 'OK', 'error');
    });
  }

  updateRowData(row_obj: IMunicipalityCityDistrict) {
    this.municipalityCityDistricts = this.municipalityCityDistricts.filter((value, key) => {
      if (value.id == row_obj.id) {
        value = row_obj;

        this.adminService.updateMunicipalityCityDistrict(value.id, value).subscribe(response => {
          this.notifierService.showNotification(`${response.name} has been updated successfully.`, 'OK', 'success');
          this.getMunicipalityCityDistricts();
        }, error => {
          this.notifierService.showNotification(`Problem updating the municipality / city / district. ${error.errors}`, 'OK', 'error');
        });
      }

      return true;
    });
  }

  deleteRowData(row_obj: IMunicipalityCityDistrict) {
    this.municipalityCityDistricts = this.municipalityCityDistricts.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.adminService.deleteMunicipalityCityDistrict(row_obj.id).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been deleted successfully.`, 'OK', 'success');
      this.getMunicipalityCityDistricts();
    }, error => {
      this.notifierService.showNotification(`Problem deleting the municipality / city / district. ${error.errors}`, 'OK', 'error');
    });
  }

  onSearch() {
    this.municipalityCityDistrictParams.search = this.searchTerm.nativeElement.value;
    this.getMunicipalityCityDistricts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.municipalityCityDistrictParams = new MunicipalityCityDistrictParams();
    this.getMunicipalityCityDistricts();
  }
}
