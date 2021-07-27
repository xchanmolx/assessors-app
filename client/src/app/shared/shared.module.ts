import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TextInputComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent
  ]
})
export class SharedModule { }
