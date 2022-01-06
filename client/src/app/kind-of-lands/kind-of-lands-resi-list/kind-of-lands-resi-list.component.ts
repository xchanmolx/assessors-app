import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmResiComponent } from 'src/app/shared/components/dialogs/confirm-resi/confirm-resi.component';
import { KindOfLandsParams } from 'src/app/shared/models/kindOfLandsParams';
import { IResidential } from 'src/app/shared/models/residential';
import { KindOfLandsService } from '../kind-of-lands.service';

@Component({
  selector: 'app-kind-of-lands-resi-list',
  templateUrl: './kind-of-lands-resi-list.component.html',
  styleUrls: ['./kind-of-lands-resi-list.component.scss']
})
export class KindOfLandsResiListComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  resis: IResidential[] = [];
  residentialParams = new KindOfLandsParams();
  totalCount: number = 0;
  displayedColumns: string[] = ['name', 'marketValue', 'actions'];

  constructor(public dialog: MatDialog, private kindOfLandsService: KindOfLandsService,
    private notifierService: NotifierService) {
      this.getResidentials();
  }

  ngOnInit(): void {
  }

  getResidentials() {
    this.kindOfLandsService.getResidentials(this.residentialParams).subscribe(response => {
      this.totalCount = response!.count;
      this.resis = response!.data;
    }, error => {
      this.notifierService.showNotification(`Problem loading the residential land. ${error.errors}`, 'OK', 'error');
    });
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmResiComponent, {
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

  addRowData(row_obj: IResidential) {
    this.kindOfLandsService.createResidential(row_obj).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been added successfully.`, 'OK', 'success');
      this.getResidentials();
    }, error => {
      this.notifierService.showNotification(`Problem adding the residential land. ${error.errors}`, 'OK', 'error');
    });
  }

  updateRowData(row_obj: IResidential) {
    this.resis = this.resis.filter((value, key) => {
      if (value.id == row_obj.id) {
        value = row_obj;

        this.kindOfLandsService.updateResidential(value.id, value).subscribe(response => {
          this.notifierService.showNotification(`${response.name} has been updated successfully.`, 'OK', 'success');
          this.getResidentials();
        }, error => {
          this.notifierService.showNotification(`Problem updating the residential land. ${error.errors}`, 'OK', 'error');
        });
      }

      return true;
    });
  }

  deleteRowData(row_obj: IResidential) {
    this.resis = this.resis.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.kindOfLandsService.deleteResidential(row_obj.id).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been deleted successfully.`, 'OK', 'success');
      this.getResidentials();
    }, error => {
      this.notifierService.showNotification(`Problem deleting the residential land. ${error.errors}`, 'OK', 'error');
    });
  }

  onSearch() {
    this.residentialParams.search = this.searchTerm.nativeElement.value;
    this.getResidentials();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.residentialParams = new KindOfLandsParams();
    this.getResidentials();
  }

}
