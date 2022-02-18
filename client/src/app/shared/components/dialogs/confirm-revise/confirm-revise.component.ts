import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { RealPropertyService } from 'src/app/real-property/real-property.service';
import { IRealProperty } from 'src/app/shared/models/realProperty';

@Component({
  selector: 'app-confirm-revise',
  templateUrl: './confirm-revise.component.html',
  styleUrls: ['./confirm-revise.component.scss']
})
export class ConfirmReviseComponent implements OnInit {
  local_data!: any;
  action!: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IRealProperty, private realPropertyService: RealPropertyService,
  private notifierService: NotifierService, public dialogRef: MatDialogRef<ConfirmReviseComponent>) { 
    this.local_data = {...data};
    this.action = this.local_data.action;

    this.loadIndividualRevise();
  }

  ngOnInit(): void {
  }

  loadIndividualRevise() {
    this.realPropertyService.getRealPropertyReviseWithId(this.local_data.id).subscribe(response => {
      this.local_data = response!;

      console.log(this.local_data);
    }, error => {
      this.notifierService.showNotification(`Problem loading the individual revise data. ${error.errors}`, 'OK', 'error');
    });
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
