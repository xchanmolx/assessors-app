import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { BusyService } from '../core/services/busy.service';
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

  constructor(private realPropertyService: RealPropertyService, 
    public busyService: BusyService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getRealProperties();
  }

  ngAfterViewInit() {
    this.busyService.idle();
    this.cd.detectChanges();
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
