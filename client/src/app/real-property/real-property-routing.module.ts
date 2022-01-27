import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealPropertyAssessmentRollComponent } from './real-property-assessment-roll/real-property-assessment-roll.component';
import { RealPropertyCreateComponent } from './real-property-create/real-property-create.component';
import { RealPropertyDetailsComponent } from './real-property-details/real-property-details.component';
import { RealPropertySearchLotNoComponent } from './real-property-search-lot-no/real-property-search-lot-no.component';
import { RealPropertyComponent } from './real-property.component';

const routes: Routes = [
  { path: '', component: RealPropertyComponent, data: {title: 'Real Property'} },
  { path: 'add', component: RealPropertyCreateComponent, data: {breadcrumb: 'Add Real Property', title: 'Add Real Property'}},
  { path: 'assessment-roll', component: RealPropertyAssessmentRollComponent, data: {breadcrumb: 'Assessment Roll', title: 'Assessment Roll'}},
  { path: ':id', component: RealPropertyDetailsComponent, data: {breadcrumb: { alias: 'ownerName' }, title: 'Real Property Detail'}},
  { path: 'tracer/:lotNo', component: RealPropertySearchLotNoComponent, data: {breadcrumb: 'Tracer of Real Properties', title: 'Real Property Tracer'}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RealPropertyRoutingModule { }
