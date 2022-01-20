import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PagerComponent } from './components/pager/pager.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmImageComponent } from './components/dialogs/confirm-image/confirm-image.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { ConfirmUserDeleteComponent } from './components/dialogs/confirm-user-delete/confirm-user-delete.component';
import { ConfirmAgriComponent } from './components/dialogs/confirm-agri/confirm-agri.component';
import { ConfirmCommComponent } from './components/dialogs/confirm-comm/confirm-comm.component';
import { ConfirmInduComponent } from './components/dialogs/confirm-indu/confirm-indu.component';
import { ConfirmResiComponent } from './components/dialogs/confirm-resi/confirm-resi.component';
import { ConfirmBrgyComponent } from './components/dialogs/confirm-brgy/confirm-brgy.component';
import { ConfirmStaffComponent } from './components/dialogs/confirm-staff/confirm-staff.component';



@NgModule({
  declarations: [
    TextInputComponent,
    PagerComponent,
    PagingHeaderComponent,
    ConfirmComponent,
    ConfirmImageComponent,
    HasRoleDirective,
    ConfirmUserDeleteComponent,
    ConfirmAgriComponent,
    ConfirmCommComponent,
    ConfirmInduComponent,
    ConfirmResiComponent,
    ConfirmBrgyComponent,
    ConfirmStaffComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    ReactiveFormsModule,
    TextInputComponent,
    ConfirmComponent,
    HasRoleDirective
  ]
})
export class SharedModule { }
