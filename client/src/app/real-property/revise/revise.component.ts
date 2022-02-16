import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/account/account.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { RealPropertyParams } from 'src/app/shared/models/realPropertyParams';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-revise',
  templateUrl: './revise.component.html',
  styleUrls: ['./revise.component.scss']
})
export class ReviseComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  realPropertiesRevise: IRealProperty[] = [];
  reviseParams = new RealPropertyParams();
  totalCount: number = 0;

  displayedColumns: string[] = ['tdNo', 'owner', 'address', 'propertyLocation', 'propertyIndentificationNo',
  'arpNo', 'tinNo', 'telephoneNo', 'octTctCloaNo', 'octNo', 'dated', 'surveyLotNo', 'assessorLotNo', 'blkNo',
  'boundary', 'kindOfPropertyAssessed', 'noOfStoreys', 'briefDescription', 'specify',
  'kindOfProperties', 'totalAssessedValueInWord', 'taxableExempt', 'quarter', 'year', 'recommendedBy',
  'approvedBy', 'date', 'declarationCancels', 'ownerTdNoCancels', 'previousAssessedValue', 'memoranda',
  'approvedMessage', 'notes', 'actions'];

  constructor(private realPropertyService: RealPropertyService, private accountService: AccountService,
    public dialog: MatDialog, private notifierService: NotifierService) {

  }

  ngOnInit(): void {
  }

}
