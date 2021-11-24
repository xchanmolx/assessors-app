import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from '../account/account.service';
import { BusyService } from '../core/services/busy.service';
import { NotifierService } from '../core/services/notifier.service';
import { ConfirmComponent } from '../shared/components/dialogs/confirm/confirm.component';
import { PhotoParams } from '../shared/models/photoParams';
import { IRealProperty } from '../shared/models/realProperty';
import { RealPropertyParams } from '../shared/models/realPropertyParams';
import { RealPropertyService } from './real-property.service';

@Component({
  selector: 'app-real-property',
  templateUrl: './real-property.component.html',
  styleUrls: ['./real-property.component.scss']
})
export class RealPropertyComponent implements OnInit, AfterViewInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  realProperties: IRealProperty[] = [];
  realPropertyParams = new RealPropertyParams();
  photoParams = new PhotoParams();
  totalCount: number = 0;
  defaultSelect = 'owner';
  sortOptions = [
    { name: 'Alphabetical', value: 'owner' },
    { name: 'Effective Year: Old Year', value: 'yearAsc'},
    { name: 'Effective Year: Latest Year', value: 'yearDesc'}
  ];
  
  displayedColumns: string[] = ['tdNo', 'owner', 'address', 'propertyLocation', 'propertyIndentificationNo',
  'arpNo', 'tinNo', 'telephoneNo', 'octTctCloaNo', 'octNo', 'dated', 'surveyLotNo', 'assessorLotNo', 'blkNo',
  'boundary', 'kindOfPropertyAssessed', 'noOfStoreys', 'briefDescription', 'specify',
  'kindOfProperties', 'totalAssessedValueInWord', 'taxableExempt', 'quarter', 'year', 'recommendedBy',
  'approvedBy', 'date', 'declarationCancels', 'ownerTdNoCancels', 'previousAssessedValue', 'memoranda',
  'approvedMessage', 'notes', 'actions'];
  showFirstLastButtons = true;

  constructor(private realPropertyService: RealPropertyService, private accountService: AccountService,
    public busyService: BusyService, private cd: ChangeDetectorRef, public dialog: MatDialog,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.getRealProperties();
  }
  
  ngAfterViewInit() {
    this.busyService.idle();
    this.cd.detectChanges();
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: obj,
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  updateRowData(row_obj: IRealProperty){
    this.realProperties = this.realProperties.filter((value, key) => {
      if(value.id == row_obj.id){
        value.id = row_obj.id;
        value.tdNo = row_obj.tdNo;
        value.owner = row_obj.owner;
        value.address = row_obj.address;
        value.propertyLocation = row_obj.propertyLocation;
        value.propertyIndentificationNo = row_obj.propertyIndentificationNo;
        value.arpNo = row_obj.arpNo;
        value.tinNo = row_obj.tinNo;
        value.telephoneNo = row_obj.telephoneNo;
        value.octTctCloaNo = row_obj.octTctCloaNo;
        value.octNo = row_obj.octNo;
        value.dated = row_obj.dated;
        value.surveyLotNo = row_obj.surveyLotNo;
        value.assessorLotNo = row_obj.assessorLotNo;
        value.blkNo = row_obj.blkNo;
        value.boundary = row_obj.boundary; // Boundary object
        value.kindOfPropertyAssessed = row_obj.kindOfPropertyAssessed;
        value.noOfStoreys = row_obj.noOfStoreys;
        value.briefDescription = row_obj.briefDescription;
        value.specify = row_obj.specify;
        value.kindOfProperties = row_obj.kindOfProperties; // Kind of Properties object
        value.totalAssessedValueInWord = row_obj.totalAssessedValueInWord;
        value.taxableExempt = row_obj.taxableExempt;
        value.quarter = row_obj.quarter;
        value.year = row_obj.year;
        value.recommendedBy = row_obj.recommendedBy;
        value.approvedBy = row_obj.approvedBy;
        value.declarationCancels = row_obj.declarationCancels;
        value.ownerTdNoCancels = row_obj.ownerTdNoCancels;
        value.previousAssessedValue = row_obj.previousAssessedValue;
        value.memoranda = row_obj.memoranda;
        value.approvedMessage = row_obj.approvedMessage;
        value.notes = row_obj.notes;

        this.realPropertyService.updateRealProperty(value.id, value).subscribe((response) => {
          this.notifierService.showNotification(`${response.owner} has been updated successfully.`, 'OK', 'success');
        }, error => {
          this.notifierService.showNotification('Problem updating the real property', 'OK', 'error');

          this.getRealProperties();
        });

      }

      return true;
    });

  }

  deleteRowData(row_obj: IRealProperty) {
    this.realProperties = this.realProperties.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.realPropertyService.deleteRealProperty(row_obj.id, this.photoParams);
    this.totalCount--;
  }

  getRealProperties() {
    this.realPropertyService.getRealProperties(this.realPropertyParams).subscribe(response => {
      this.realProperties = response!.data;
      this.realPropertyParams.pageNumber = response!.pageIndex;
      this.realPropertyParams.pageSize = response!.pageSize;
      this.totalCount = response!.count;
    }, error => {
      console.log(error.errors);
    });
  }

  onPageChanged(event: PageEvent) {
    this.realPropertyParams.pageNumber = event.pageIndex+1;

    if (this.realPropertyParams.pageSize !== event.pageSize) {
      this.realPropertyParams.pageSize = event.pageSize;
    }

    this.getRealProperties();
  }

  onSortSelected(event: MatSelectChange) {
    this.realPropertyParams.sort = event.value;
    this.getRealProperties();
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

}
