import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealPropertyCreateComponent } from './real-property-create/real-property-create.component';
import { RealPropertyDetailsComponent } from './real-property-details/real-property-details.component';
import { RealPropertyComponent } from './real-property.component';

const routes: Routes = [
  { path: '', component: RealPropertyComponent },
  { path: 'add', component: RealPropertyCreateComponent, data: {breadcrumb: 'Add Real Property'}},
  { path: ':id', component: RealPropertyDetailsComponent, data: {breadcrumb: {alias: 'realPropertyDetails'}}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RealPropertyRoutingModule { }
