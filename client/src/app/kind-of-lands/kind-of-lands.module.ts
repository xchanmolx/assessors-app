import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KindOfLandsComponent } from './kind-of-lands/kind-of-lands.component';
import { KindOfLandsRoutingModule } from './kind-of-lands-routing.module';
import { KindOfLandsAgriListComponent } from './kind-of-lands-agri-list/kind-of-lands-agri-list.component';

@NgModule({
  declarations: [
    KindOfLandsComponent,
    KindOfLandsAgriListComponent
  ],
  imports: [
    CommonModule,
    KindOfLandsRoutingModule
  ]
})
export class KindOfLandsModule { }
