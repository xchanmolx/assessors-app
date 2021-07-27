import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealPropertyComponent } from './real-property/real-property.component';
import { RealPropertyRoutingModule } from './real-property-routing.module';



@NgModule({
  declarations: [
    RealPropertyComponent
  ],
  imports: [
    CommonModule,
    RealPropertyRoutingModule
  ]
})
export class RealPropertyModule { }
