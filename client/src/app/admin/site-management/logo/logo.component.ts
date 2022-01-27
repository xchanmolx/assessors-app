import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmLogoComponent } from 'src/app/shared/components/dialogs/confirm-logo/confirm-logo.component';
import { ILogo } from 'src/app/shared/models/logo';
import { LogoParams } from 'src/app/shared/models/logoParams';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  logos: ILogo[] = [];
  logoParams = new LogoParams();
  displayedColumns: string[] = ['url', 'ordinal', 'actions'];

  constructor(public dialog: MatDialog, private adminService: AdminService,
    private notifierService: NotifierService) { 
      this.getLogos();
  }

  ngOnInit(): void {
  }

  getLogos() {
    this.adminService.getLogos().subscribe(response => {
      this.logos = response;
    }, error => {
      this.notifierService.showNotification(`Problem loading the logos. ${error.errors}`, 'OK', 'error');
    });
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmLogoComponent, {
      data: obj,
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
          this.addRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      } 
    });
  }

  addRowData(logo: ILogo) {
    this.logoParams.ordinal = logo.ordinal;
    this.adminService.uploadLogos(this.logoParams).subscribe(() => {
      this.notifierService.showNotification('Logo has been added successfully.', 'OK', 'success');
      this.getLogos();
    }, error => {
      this.notifierService.showNotification(`Problem adding the logos. ${error.errors}`, 'OK', 'error');
    });
  }

  deleteRowData(logo: ILogo) {
    this.logos = this.logos.filter((value, key) => {
      return value.id != logo.id;
    });

    this.adminService.deleteLogo(logo.id, this.logoParams).subscribe(response => {
      this.notifierService.showNotification(`${response.ordinal} has been deleted successfully.`, 'OK', 'success');
      this.getLogos();
    }, error => {
      this.notifierService.showNotification(`Problem deleting the logo. ${error.errors}`, 'OK', 'error');
    });
  }

}
