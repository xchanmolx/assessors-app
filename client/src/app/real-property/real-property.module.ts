import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { RealPropertyRoutingModule } from './real-property-routing.module';
import { RealPropertyComponent } from './real-property.component';
import { SharedModule } from '../shared/shared.module';
import { RealPropertyDetailsComponent } from './real-property-details/real-property-details.component';



@NgModule({
  declarations: [
    RealPropertyComponent,
    RealPropertyDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RealPropertyRoutingModule,
    MatSelectModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class RealPropertyModule { }
