import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IRealProperty } from 'src/app/shared/models/realProperty';
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

  displayedColumns: string[] = ['owner', 'propertyLocation', 'tdNo', 'year', 'surveyLotNo', 'kindOfProperties', 'memoranda'];

  constructor(private realPropertyService: RealPropertyService, private activatedRoute: ActivatedRoute, 
    private accountService: AccountService, private notifierService: NotifierService) { 
      this.lotNo = this.activatedRoute.snapshot.paramMap.get('lotNo')!;

      this.loadRealProperties();   
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

}
