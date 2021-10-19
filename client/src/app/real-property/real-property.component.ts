import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
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
  defaultSelect = 'ownerName';
  sortOptions = [
    { name: 'Alphabetical', value: 'ownerName' },
    { name: 'Effective Year: Old Year', value: 'yearAsc'},
    { name: 'Effective Year: Latest Year', value: 'yearDesc'}
  ];
  
  displayedColumns: string[] = ['taxDecNumber', 'ownerName', 'ownerAddress', 'propertyLocation', 'surveyLotNumber',
   'landArea', 'effectiveYear', 'propertyIndex', 'arpNumber', 'kind', 'class', 'assessedValue',
   'previousTDNumber', 'previousAV','taxableExempt', 'remarks', 'actions'];
  showFirstLastButtons = true;

  constructor(private realPropertyService: RealPropertyService,
    public busyService: BusyService, private cd: ChangeDetectorRef, public dialog: MatDialog,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.getRealProperties();
  }
  
  ngAfterViewInit() {
    this.busyService.idle();
    this.cd.detectChanges();
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
        value.ownerName = row_obj.ownerName;
        value.taxDecNumber = row_obj.taxDecNumber;
        value.surveyLotNumber = row_obj.surveyLotNumber;
        value.propertyLocation = row_obj.propertyLocation;
        value.effectiveYear = row_obj.effectiveYear;
        value.landArea = row_obj.landArea;
        value.remarks = row_obj.remarks;
        value.propertyIndex = row_obj.propertyIndex;
        value.arpNumber = row_obj.arpNumber;
        value.ownerAddress = row_obj.ownerAddress;
        value.kind = row_obj.kind;
        value.class = row_obj.class;
        value.assessedValue = row_obj.assessedValue;
        value.previousTDNumber = row_obj.previousTDNumber;
        value.previousAV = row_obj.previousAV;
        value.taxableExempt = row_obj.taxableExempt;

        this.realPropertyService.updateRealProperty(value.id, value).subscribe((response) => {
          this.notifierService.showNotification(`${response.ownerName} has been updated successfully.`, 'OK', 'success');
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
