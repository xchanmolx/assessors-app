import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CarouselModule.forRoot()
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
