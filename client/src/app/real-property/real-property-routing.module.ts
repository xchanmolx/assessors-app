import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergeOfLandsComponent } from './merge-of-lands/merge-of-lands.component';
import { RealPropertyAssessmentRollComponent } from './real-property-assessment-roll/real-property-assessment-roll.component';
import { RealPropertyCreateComponent } from './real-property-create/real-property-create.component';
import { RealPropertyDetailsComponent } from './real-property-details/real-property-details.component';
import { RealPropertyPrintComponent } from './real-property-print/real-property-print.component';
import { RealPropertySearchLotNoComponent } from './real-property-search-lot-no/real-property-search-lot-no.component';
import { RealPropertyComponent } from './real-property.component';
import { ReviseComponent } from './revise/revise.component';

const routes: Routes = [
  { path: '', component: RealPropertyComponent, data: {title: 'Real Property'} },
  { path: 'add', component: RealPropertyCreateComponent, data: {breadcrumb: 'Add Real Property', title: 'Add Real Property'}},
  { path: 'print', component: RealPropertyPrintComponent, data: {breadcrumb: 'Print Real Properties', title: 'Print Real Properties'}},
  { path: 'assessment-roll', component: RealPropertyAssessmentRollComponent, data: {breadcrumb: 'Assessment Roll', title: 'Assessment Roll'}},
  { path: 'merge-of-lands', component: MergeOfLandsComponent, data: {breadcrumb: 'Merge of Lands', title: 'Merge of Lands'}},
  { path: 'revise', component: ReviseComponent, data: {breadcrumb: 'Revise', title: 'Revise'}},
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
