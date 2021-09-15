import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusyService } from 'src/app/core/services/busy.service';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-real-property-search-lot-no',
  templateUrl: './real-property-search-lot-no.component.html',
  styleUrls: ['./real-property-search-lot-no.component.scss']
})
export class RealPropertySearchLotNoComponent implements OnInit, AfterViewInit {
  realProperties!: IRealProperty[];
  lotNo!: string;
  pipe = new DatePipe('en-PH');
  now = Date.now();
  formattedDate = this.pipe.transform(this.now, 'short');

  displayedColumns: string[] = ['ownerName', 'propertyLocation', 'taxDecNumber', 'effectiveYear', 'surveyLotNumber', 'landArea', 'remarks'];

  constructor(private realPropertyService: RealPropertyService, public busyService: BusyService,
     private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.lotNo = this.activatedRoute.snapshot.paramMap.get('lotNo')!;

    this.loadRealProperties();
  }

  ngAfterViewInit() {
    this.busyService.idle();
    this.cd.detectChanges();
  }

  loadRealProperties() {
    this.realPropertyService.searchLotNo(this.activatedRoute.snapshot.paramMap.get('lotNo')!).subscribe(realProperties => {
      this.realProperties = realProperties;
    }, error => {
      console.log(error);
    })
  }

}
