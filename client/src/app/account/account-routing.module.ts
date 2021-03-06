import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreventUnsavedChangesGuard } from '../guards/prevent-unsaved-changes.guard';
import { UserEditResolver } from '../resolvers/users/user-edit.resolver';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: {title: 'Login Account'} },
  { path: 'register', component: RegisterComponent, data: {title: 'Register Account'} },
  { path: 'edit', component: EditComponent,
    resolve: {user: UserEditResolver},
    canDeactivate: [PreventUnsavedChangesGuard],
    data: {title: 'Edit Account'} }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
