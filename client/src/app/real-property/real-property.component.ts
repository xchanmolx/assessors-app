import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTable } from '@angular/material/table';
import { BusyService } from '../core/services/busy.service';
import { NotifierService } from '../core/services/notifier.service';
import { ConfirmComponent } from '../shared/components/dialogs/confirm/confirm.component';
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
  realProperties!: IRealProperty[];
  realPropertyParams = new RealPropertyParams();
  totalCount!: number;
  defaultSelect = 'ownerName';
  sortOptions = [
    { name: 'Alphabetical', value: 'ownerName' },
    { name: 'Effective Year: Old Year', value: 'yearAsc'},
    { name: 'Effective Year: Latest Year', value: 'yearDesc'}
  ];
  
  displayedColumns: string[] = ['ownerName', 'propertyLocation', 'taxDecNumber', 'effectiveYear', 'surveyLotNumber', 'landArea', 'remarks', 'actions'];
  showFirstLastButtons = true;

  str!: string;

  @ViewChild(MatTable, {static: true}) table!: MatTable<IRealProperty>;

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
      width: '400px',
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
        value.ownerName = row_obj.ownerName;
        value.propertyLocation = row_obj.propertyLocation;
        value.taxDecNumber = row_obj.taxDecNumber;
        value.effectiveYear = row_obj.effectiveYear;
        value.surveyLotNumber = row_obj.surveyLotNumber;
        value.landArea = row_obj.landArea;
        value.remarks = row_obj.remarks;
        value.pictureUrl = row_obj.pictureUrl;
      }
      return true;
    });

    this.realPropertyService.updateRealProperty(row_obj.id, row_obj).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  deleteRowData(row_obj: IRealProperty){
    this.realProperties = this.realProperties.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.realPropertyService.deleteRealProperty(row_obj.id).subscribe((realProperty) => {
      this.notifierService.showNotification(`${realProperty.ownerName} has been deleted successfully.`, 'OK', 'success');
      this.totalCount--;
    }, error => {
      this.notifierService.showNotification(error, 'OK', 'error');
    });
  }

  getRealProperties() {
    this.realPropertyService.getRealProperties(this.realPropertyParams).subscribe(response => {
      this.realProperties = response!.data;
      this.realPropertyParams.pageNumber = response!.pageIndex;
      this.realPropertyParams.pageSize = response!.pageSize;
      this.totalCount = response!.count;
    }, error => {
      console.log(error);
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
