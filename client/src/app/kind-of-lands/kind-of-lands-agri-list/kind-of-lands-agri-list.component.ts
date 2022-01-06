import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmAgriComponent } from 'src/app/shared/components/dialogs/confirm-agri/confirm-agri.component';
import { IAgricultural } from 'src/app/shared/models/agricultural';
import { KindOfLandsParams } from 'src/app/shared/models/kindOfLandsParams';
import { KindOfLandsService } from '../kind-of-lands.service';

@Component({
  selector: 'app-kind-of-lands-agri-list',
  templateUrl: './kind-of-lands-agri-list.component.html',
  styleUrls: ['./kind-of-lands-agri-list.component.scss']
})
export class KindOfLandsAgriListComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  agris: IAgricultural[] = [];
  agriculturalParams = new KindOfLandsParams();
  totalCount: number = 0;
  displayedColumns: string[] = ['name', 'firstClass', 'secondClass', 'thirdClass', 'actions'];

  constructor(public dialog: MatDialog, private kindOfLandsService: KindOfLandsService,
    private notifierService: NotifierService) { 
      this.getAgriculturals();
  }

  ngOnInit(): void {
  }

  getAgriculturals() {
    this.kindOfLandsService.getAgriculturals(this.agriculturalParams).subscribe(response => {
      this.totalCount = response!.count;
      this.agris = response!.data;
    }, error => {
      this.notifierService.showNotification(`Problem loading the agricultural land. ${error.errors}`, 'OK', 'error');
    });
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmAgriComponent, {
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

  addRowData(row_obj: IAgricultural) {
    this.kindOfLandsService.createAgricultural(row_obj).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been added successfully.`, 'OK', 'success');
      this.getAgriculturals();
    }, error => {
      this.notifierService.showNotification(`Problem adding the agricultural land. ${error.errors}`, 'OK', 'error');
    });
  }

  updateRowData(row_obj: IAgricultural) {
    this.agris = this.agris.filter((value, key) => {
      if (value.id == row_obj.id) {
        value = row_obj;

        this.kindOfLandsService.updateAgricultural(value.id, value).subscribe(response => {
          this.notifierService.showNotification(`${response.name} has been updated successfully.`, 'OK', 'success');
          this.getAgriculturals();
        }, error => {
          this.notifierService.showNotification(`Problem updating the agricultural land. ${error.errors}`, 'OK', 'error');
        });
      }

      return true;
    });
  }

  deleteRowData(row_obj: IAgricultural) {
    this.agris = this.agris.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.kindOfLandsService.deleteAgricultural(row_obj.id).subscribe(response => {
      this.notifierService.showNotification(`${response.name} has been deleted successfully.`, 'OK', 'success');
      this.getAgriculturals();
    }, error => {
      this.notifierService.showNotification(`Problem deleting the agricultural land. ${error.errors}`, 'OK', 'error');
    });
  }

  onSearch() {
    this.agriculturalParams.search = this.searchTerm.nativeElement.value;
    this.getAgriculturals();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.agriculturalParams = new KindOfLandsParams();
    this.getAgriculturals();
  }

}
