import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { AdminService } from 'src/app/admin/admin.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { IStaff } from 'src/app/shared/models/staff';
import { StaffParams } from 'src/app/shared/models/staffParams';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-real-property-search-lot-no',
  templateUrl: './real-property-search-lot-no.component.html',
  styleUrls: ['./real-property-search-lot-no.component.scss']
})
export class RealPropertySearchLotNoComponent implements OnInit {
  realProperties!: IRealProperty[];
  lotNo!: string;
  pipe = new DatePipe('en-PH');
  now = Date.now();
  formattedDate = this.pipe.transform(this.now, 'short');
  staffs: IStaff[] = [];
  totalCount: number = 0;
  staffParams = new StaffParams();
  assessor!: IStaff | undefined;
  staffsFilter!: IStaff[] | undefined;
  staffDefault!: IStaff | undefined;

  displayedColumns: string[] = ['owner', 'propertyLocation', 'tdNo', 'year', 'surveyLotNo', 'kindOfProperties', 'memoranda'];

  constructor(private realPropertyService: RealPropertyService, private activatedRoute: ActivatedRoute, 
    private accountService: AccountService, private notifierService: NotifierService, private adminService: AdminService) { 
      this.lotNo = this.activatedRoute.snapshot.paramMap.get('lotNo')!;

      this.loadRealProperties();
      this.getStaffs();
     }

  ngOnInit(): void {
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  loadRealProperties() {
    this.realPropertyService.searchLotNo(this.activatedRoute.snapshot.paramMap.get('lotNo')!).subscribe(response => {
      this.realProperties = response;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the data.`, 'OK', 'error');
    })
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

}
