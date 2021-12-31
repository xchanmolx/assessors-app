import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KindOfLandsComponent } from './kind-of-lands/kind-of-lands.component';
import { KindOfLandsRoutingModule } from './kind-of-lands-routing.module';
import { KindOfLandsAgriListComponent } from './kind-of-lands-agri-list/kind-of-lands-agri-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    KindOfLandsComponent,
    KindOfLandsAgriListComponent
  ],
  imports: [
    CommonModule,
    KindOfLandsRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    SharedModule
  ]
})
export class KindOfLandsModule { }
