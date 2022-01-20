import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmStaffComponent } from 'src/app/shared/components/dialogs/confirm-staff/confirm-staff.component';
import { IStaff } from 'src/app/shared/models/staff';
import { StaffParams } from 'src/app/shared/models/staffParams';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  staffs: IStaff[] = [];
  staffParams = new StaffParams();
  totalCount: number = 0;
  displayedColumns: string[] = ['name', 'gender', 'address', 'contact', 'designation', 'actions'];

  constructor(public dialog: MatDialog, private adminService: AdminService,
    private notifierService: NotifierService) {
    this.getStaffs();      
  }

  ngOnInit(): void {
  }

  getStaffs() {
    this.adminService.getStaffs(this.staffParams).subscribe(response => {
      this.totalCount = response!.count;
      this.staffs = response!.data;
    }, error => {
      this.notifierService.showNotification(`Problem loading the staffs. ${error.errors}`, 'OK', 'error');
    });
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmStaffComponent, {
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

  addRowData(row_obj: IStaff) {
    this.adminService.createStaff(row_obj).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been added successfully.`, 'OK', 'success');
      this.getStaffs();
    }, error => {
      this.notifierService.showNotification(`Problem adding the staff. ${error.errors}`, 'OK', 'error');
    });
  }

  updateRowData(row_obj: IStaff) {
    this.staffs = this.staffs.filter((value, key) => {
      if (value.id == row_obj.id) {
        value = row_obj;

        this.adminService.updateStaff(value.id, value).subscribe(response => {
          this.notifierService.showNotification(`${response.name} has been updated successfully.`, 'OK', 'success');
          this.getStaffs();
        }, error => {
          this.notifierService.showNotification(`Problem updating the staff. ${error.errors}`, 'OK', 'error');
        });
      }

      return true;
    });
  }

  deleteRowData(row_obj: IStaff) {
    this.staffs = this.staffs.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.adminService.deleteStaff(row_obj.id).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been deleted successfully.`, 'OK', 'success');
      this.getStaffs();
    }, error => {
      this.notifierService.showNotification(`Problem deleting the staff. ${error.errors}`, 'OK', 'error');
    });
  }

  onSearch() {
    this.staffParams.search = this.searchTerm.nativeElement.value;
    this.getStaffs();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.staffParams = new StaffParams();
    this.getStaffs();
  }
}
