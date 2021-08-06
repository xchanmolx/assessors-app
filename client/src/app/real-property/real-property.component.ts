import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { IRealProperty } from '../shared/models/realProperty';
import { RealPropertyParams } from '../shared/models/realPropertyParams';
import { RealPropertyService } from './real-property.service';

@Component({
  selector: 'app-real-property',
  templateUrl: './real-property.component.html',
  styleUrls: ['./real-property.component.scss']
})
export class RealPropertyComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  realProperties!: IRealProperty[];
  realPropertyParams = new RealPropertyParams();
  totalCount!: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'ownerName' },
    { name: 'Effective Year: Old Year', value: 'yearAsc'},
    { name: 'Effective Year: Latest Year', value: 'yearDesc'}
  ];
  
  displayedColumns: string[] = ['ownerName', 'propertyLocation', 'taxDecNumber', 'effectiveYear', 'surveyLotNumber', 'landArea', 'remarks'];
  pageEvent!: EventEmitter<PageEvent>;
  showFirstLastButtons = true;
  defaultSelect = 'ownerName';

  constructor(private realPropertyService: RealPropertyService) { }

  ngOnInit(): void {
    this.getRealProperties();
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

  onSortSelected(event: MatSelectChange) {
    this.realPropertyParams.sort = event.value;
    this.getRealProperties();
  }

  onPageChanged(event: PageEvent) {
    if (this.realPropertyParams.pageNumber !== event.pageIndex) {
      this.realPropertyParams.pageNumber = event.pageIndex;
      this.getRealProperties();
    }
  }

  onSearch() {
    this.realPropertyParams.search = this.searchTerm.nativeElement.value;
    this.realPropertyParams.pageNumber = 1;
    this.getRealProperties();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.realPropertyParams = new RealPropertyParams();
    this.getRealProperties();
  }

}
