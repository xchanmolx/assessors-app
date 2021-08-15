import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    SharedModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class AccountModule { }
