import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmInduComponent } from 'src/app/shared/components/dialogs/confirm-indu/confirm-indu.component';
import { IIndustrial } from 'src/app/shared/models/industrial';
import { KindOfLandsParams } from 'src/app/shared/models/kindOfLandsParams';
import { KindOfLandsService } from '../kind-of-lands.service';

@Component({
  selector: 'app-kind-of-lands-indu-list',
  templateUrl: './kind-of-lands-indu-list.component.html',
  styleUrls: ['./kind-of-lands-indu-list.component.scss']
})
export class KindOfLandsInduListComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  indus: IIndustrial[] = [];
  industrialParams = new KindOfLandsParams();
  totalCount: number = 0;
  displayedColumns: string[] = ['id', 'name', 'marketValue', 'actions'];

  constructor(public dialog: MatDialog, private kindOfLandsService: KindOfLandsService,
    private notifierService: NotifierService) { 
      this.getIndustrials();
  }

  ngOnInit(): void {
  }

  getIndustrials() {
    this.kindOfLandsService.getIndustrials(this.industrialParams).subscribe(response => {
      this.totalCount = response!.count;
      this.indus = response!.data;
    }, error => {
      this.notifierService.showNotification(`Problem loading the industrial land. ${error.errors}`, 'OK', 'error');
    });
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmInduComponent, {
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

  addRowData(row_obj: IIndustrial) {
    this.kindOfLandsService.createIndustrial(row_obj).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been added successfully.`, 'OK', 'success');
      this.getIndustrials();
    }, error => {
      this.notifierService.showNotification(`Problem adding the industrial land. ${error.errors}`, 'OK', 'error');
    });
  }

  updateRowData(row_obj: IIndustrial) {
    this.indus = this.indus.filter((value, key) => {
      if (value.id == row_obj.id) {
        value = row_obj;

        this.kindOfLandsService.updateIndustrial(value.id, value).subscribe(response => {
          this.notifierService.showNotification(`${response.name} has been updated successfully.`, 'OK', 'success');
          this.getIndustrials();
        }, error => {
          this.notifierService.showNotification(`Problem updating the industrial land. ${error.errors}`, 'OK', 'error');
        });
      }

      return true;
    });
  }

  deleteRowData(row_obj: IIndustrial) {
    this.indus = this.indus.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.kindOfLandsService.deleteIndustrial(row_obj.id).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been deleted successfully.`, 'OK', 'success');
      this.getIndustrials();
    }, error => {
      this.notifierService.showNotification(`Problem deleting the industrial land. ${error.errors}`, 'OK', 'error');
    });
  }

  onSearch() {
    this.industrialParams.search = this.searchTerm.nativeElement.value;
    this.getIndustrials();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.industrialParams = new KindOfLandsParams();
    this.getIndustrials();
  }

}
