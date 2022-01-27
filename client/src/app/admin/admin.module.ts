import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { SiteManagementComponent } from './site-management/site-management.component';
import { StaffComponent } from './site-management/staff/staff.component';
import { MunicipalityCityDistrictComponent } from './site-management/municipality-city-district/municipality-city-district.component';
import { ProvinceComponent } from './site-management/province/province.component';
import { LogoComponent } from './site-management/logo/logo.component';



@NgModule({
  declarations: [
    AdminPanelComponent,
    RolesModalComponent,
    UserManagementComponent,
    SiteManagementComponent,
    StaffComponent,
    MunicipalityCityDistrictComponent,
    ProvinceComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTabsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatInputModule,
    ModalModule.forRoot()
  ]
})
export class AdminModule { }
