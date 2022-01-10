import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { KindOfLandsService } from 'src/app/kind-of-lands/kind-of-lands.service';
import { ConfirmBrgyComponent } from 'src/app/shared/components/dialogs/confirm-brgy/confirm-brgy.component';
import { IBarangay } from 'src/app/shared/models/barangay';
import { KindOfLandsParams } from 'src/app/shared/models/kindOfLandsParams';

@Component({
  selector: 'app-site-management',
  templateUrl: './site-management.component.html',
  styleUrls: ['./site-management.component.scss']
})
export class SiteManagementComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  barangays: IBarangay[] = [];
  barangayParams = new KindOfLandsParams();
  totalCount: number = 0;
  displayedColumns: string[] = ['name', 'actions'];

  constructor(public dialog: MatDialog, private kindOfLandsService: KindOfLandsService,
    private notifierService: NotifierService) {
      this.getBarangays();
  }

  ngOnInit(): void {
  }

  getBarangays() {
    this.kindOfLandsService.getBarangays(this.barangayParams).subscribe(response => {
      this.totalCount = response!.count;
      this.barangays = response!.data;
    }, error => {
      this.notifierService.showNotification(`Problem loading the barangays. ${error.errors}`, 'OK', 'error');
    });
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmBrgyComponent, {
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

  addRowData(row_obj: IBarangay) {
    this.kindOfLandsService.createBarangay(row_obj).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been added successfully.`, 'OK', 'success');
      this.getBarangays();
    }, error => {
      this.notifierService.showNotification(`Problem adding the barangay. ${error.errors}`, 'OK', 'error');
    });
  }

  updateRowData(row_obj: IBarangay) {
    this.barangays = this.barangays.filter((value, key) => {
      if (value.id == row_obj.id) {
        value = row_obj;

        this.kindOfLandsService.updateBarangay(value.id, value).subscribe(response => {
          this.notifierService.showNotification(`${response.name} has been updated successfully.`, 'OK', 'success');
          this.getBarangays();
        }, error => {
          this.notifierService.showNotification(`Problem updating the barangay. ${error.errors}`, 'OK', 'error');
        });
      }

      return true;
    });
  }

  deleteRowData(row_obj: IBarangay) {
    this.barangays = this.barangays.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.kindOfLandsService.deleteBarangay(row_obj.id).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been deleted successfully.`, 'OK', 'success');
      this.getBarangays();
    }, error => {
      this.notifierService.showNotification(`Problem deleting the barangay. ${error.errors}`, 'OK', 'error');
    });
  }

  onSearch() {
    this.barangayParams.search = this.searchTerm.nativeElement.value;
    this.getBarangays();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.barangayParams = new KindOfLandsParams();
    this.getBarangays();
  }

}
