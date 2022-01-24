import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmProvinceComponent } from 'src/app/shared/components/dialogs/confirm-province/confirm-province.component';
import { IProvince } from 'src/app/shared/models/province';
import { ProvinceParams } from 'src/app/shared/models/provinceParams';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  provinces: IProvince[] = [];
  provinceParams = new ProvinceParams();
  totalCount: number = 0;
  displayedColumns: string[] = ['name', 'actions'];

  constructor(public dialog: MatDialog, private adminService: AdminService,
    private notifierService: NotifierService) {
      this.getProvinces();
  }

  ngOnInit(): void {
  }

  getProvinces() {
    this.adminService.getProvinces(this.provinceParams).subscribe(response => {
      this.totalCount = response!.count;
      this.provinces = response!.data;
    }, error => {
      this.notifierService.showNotification(`Problem loading the provinces. ${error.errors}`, 'OK', 'error');
    });
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmProvinceComponent, {
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

  addRowData(row_obj: IProvince) {
    this.adminService.createProvince(row_obj).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been added successfully.`, 'OK', 'success');
      this.getProvinces();
    }, error => {
      this.notifierService.showNotification(`Problem adding the province. ${error.errors}`, 'OK', 'error');
    });
  }

  updateRowData(row_obj: IProvince) {
    this.provinces = this.provinces.filter((value, key) => {
      if (value.id == row_obj.id) {
        value = row_obj;

        this.adminService.updateProvince(value.id, value).subscribe(response => {
          this.notifierService.showNotification(`${response.name} has been updated successfully.`, 'OK', 'success');
          this.getProvinces();
        }, error => {
          this.notifierService.showNotification(`Problem updating the province. ${error.errors}`, 'OK', 'error');
        });
      }

      return true;
    });
  }

  deleteRowData(row_obj: IProvince) {
    this.provinces = this.provinces.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.adminService.deleteProvince(row_obj.id).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been deleted successfully.`, 'OK', 'success');
      this.getProvinces();
    }, error => {
      this.notifierService.showNotification(`Problem deleting the province. ${error.errors}`, 'OK', 'error');
    });
  }

  onSearch() {
    this.provinceParams.search = this.searchTerm.nativeElement.value;
    this.getProvinces();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.provinceParams = new ProvinceParams();
    this.getProvinces();
  }
}
