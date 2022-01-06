import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmCommComponent } from 'src/app/shared/components/dialogs/confirm-comm/confirm-comm.component';
import { ICommercial } from 'src/app/shared/models/commercial';
import { KindOfLandsParams } from 'src/app/shared/models/kindOfLandsParams';
import { KindOfLandsService } from '../kind-of-lands.service';

@Component({
  selector: 'app-kind-of-lands-comm-list',
  templateUrl: './kind-of-lands-comm-list.component.html',
  styleUrls: ['./kind-of-lands-comm-list.component.scss']
})
export class KindOfLandsCommListComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  comms: ICommercial[] = [];
  commercialParams = new KindOfLandsParams();
  totalCount: number = 0;
  displayedColumns: string[] = ['name', 'marketValue', 'actions'];

  constructor(public dialog: MatDialog, private kindOfLandsService: KindOfLandsService,
    private notifierService: NotifierService) {
      this.getCommercials();
  }

  ngOnInit(): void {
  }

  getCommercials() {
    this.kindOfLandsService.getCommercials(this.commercialParams).subscribe(response => {
      this.totalCount = response!.count;
      this.comms = response!.data;
    }, error => {
      this.notifierService.showNotification(`Problem loading the commercial land. ${error.errors}`, 'OK', 'error');
    });
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmCommComponent, {
      data: obj,
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event == 'Add') {
        this.addRowData(result.data);
      }
    });
  }

  addRowData(row_obj: ICommercial) {
    this.kindOfLandsService.createCommercial(row_obj).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been added successfully.`, 'OK', 'success');
      this.getCommercials();
    }, error => {
      this.notifierService.showNotification(`Problem adding the commercial land. ${error.errors}`, 'OK', 'error');
    });
  }

  updateRowData(row_obj: ICommercial) {
    this.comms = this.comms.filter((value, key) => {
      if (value.id == row_obj.id) {
        value = row_obj;

        this.kindOfLandsService.updateCommercial(value.id, value).subscribe(response => {
          this.notifierService.showNotification(`${response.name} has been updated successfully.`, 'OK', 'success');
          this.getCommercials();
        }, error => {
          this.notifierService.showNotification(`Problem updating the commercial land. ${error.errors}`, 'OK', 'error');
        });
      }

      return true;
    });
  }

  deleteRowData(row_obj: ICommercial) {
    this.comms = this.comms.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.kindOfLandsService.deleteCommercial(row_obj.id).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been deleted successfully.`, 'OK', 'success');
      this.getCommercials();
    }, error => {
      this.notifierService.showNotification(`Problem deleting the commercial land. ${error.errors}`, 'OK', 'error');
    });
  }

  onSearch() {
    this.commercialParams.search = this.searchTerm.nativeElement.value;
    this.getCommercials();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.commercialParams = new KindOfLandsParams();
    this.getCommercials();
  }

}
