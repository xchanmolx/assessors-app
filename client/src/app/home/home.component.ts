import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { NotifierService } from '../core/services/notifier.service';
import { ILogo } from '../shared/models/logo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logos: ILogo[] = [];
  logo1st!: ILogo | undefined;
  logo2nd!: ILogo | undefined;
  logo3rd!: ILogo | undefined;

  constructor(private adminService: AdminService, private notifierService: NotifierService) { 
    this.getLogos();
  }

  ngOnInit(): void {
  }

  getLogos() {
    this.adminService.getLogos().subscribe(response => {
      this.logos = response;

      // Find the specific 1st logo
      this.logo1st = this.logos.find(logo => logo.ordinal == 'logo1st');

      // Find the specific 2nd logo
      this.logo2nd = this.logos.find(logo => logo.ordinal == 'logo2nd');

      // Find the specific 3rd logo
      this.logo3rd = this.logos.find(logo => logo.ordinal == 'logo3rd');
    }, error => {
      this.notifierService.showNotification(`Problem loading the logos. ${error.errors}`, 'OK', 'error');
    });
  }

}
