import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/account/account.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { KindOfLandsService } from 'src/app/kind-of-lands/kind-of-lands.service';
import { ConfirmReviseComponent } from 'src/app/shared/components/dialogs/confirm-revise/confirm-revise.component';
import { IBarangay } from 'src/app/shared/models/barangay';
import { BarangayParams } from 'src/app/shared/models/barangayParams';
import { IMergeYears } from 'src/app/shared/models/mergeYears';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { RealPropertyParams } from 'src/app/shared/models/realPropertyParams';
import { IReviseList } from 'src/app/shared/models/reviseList';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-revise',
  templateUrl: './revise.component.html',
  styleUrls: ['./revise.component.scss']
})
export class ReviseComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  reviseList: IReviseList[] = [];
  reviseParams = new RealPropertyParams();
  totalCount: number = 0;
  barangays: IBarangay[] = [];
  barangayParams = new BarangayParams();
  defaultBarangaySelect: any;
  mergeYears: IMergeYears[] = [];
  defaultLatestYear: any;

  displayedColumns: string[] = ['id', 'tdNo', 'owner', 'address', 'barangay', 'surveyLotNo', 'year', 'actions'];

  constructor(private realPropertyService: RealPropertyService, private accountService: AccountService,
    public dialog: MatDialog, private notifierService: NotifierService, private kindOfLandsService: KindOfLandsService) {
    this.getBarangays();
    this.getMergeYears();
    this.getReviseList();
  }

  ngOnInit(): void {
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmReviseComponent, {
      data: obj,
      width: '1200px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Revise') {
        this.reviseSaveData(result.data);
      }
    });
  }

  reviseSaveData(row_obj: IRealProperty) {
    this.realPropertyService.createRealProperty(row_obj).subscribe((response) => {
      row_obj.id = response.id;

      console.log(row_obj);
    }, error => {
      this.notifierService.showNotification(`Problem saving the revise data. ${error.errors}`, 'OK', 'error');
    });
  }

  getReviseList() {
    this.reviseParams.barangay = this.defaultBarangaySelect;
    this.reviseParams.year = this.defaultLatestYear;

    this.realPropertyService.getRealPropertiesRevise(this.reviseParams).subscribe(response => {
      this.reviseList = response!.data;
      this.totalCount = response!.count;
    }, error => {
      this.notifierService.showNotification(`Problem loading the revise data. ${error.errors}`, 'OK', 'error');
    });
  }

  onBarangaySelected(event: MatSelectChange) {
    this.reviseParams.barangay = event.value;
    this.getReviseList();
  }

  onLatestYearSelected(event: MatSelectChange) {
    this.reviseParams.year = event.value;
    this.getReviseList();
  }

  onSearch() {
    this.reviseParams.search = this.searchTerm.nativeElement.value;
    this.getReviseList();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.reviseParams = new RealPropertyParams();
    this.getReviseList();
  }

  getBarangays() {
    this.kindOfLandsService.getBarangays(this.barangayParams).subscribe((response) => {
      this.barangays = response!.data;

      // First element or index of barangays array
      var firstBarangay = this.barangays.find(x => x.name !== undefined);

      this.defaultBarangaySelect = firstBarangay?.name;

      this.getReviseList();
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

      this.getReviseList();
    }, error => {
      this.notifierService.showNotification(`Problem loading the merge years. ${error.errors}`, 'OK', 'error');
    });
  }

}
