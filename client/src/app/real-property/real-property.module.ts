import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { RealPropertyRoutingModule } from './real-property-routing.module';
import { RealPropertyComponent } from './real-property.component';
import { SharedModule } from '../shared/shared.module';
import { RealPropertyDetailsComponent } from './real-property-details/real-property-details.component';
import { RealPropertyCreateComponent } from './real-property-create/real-property-create.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MatInputAutofocusDirective } from './mat-input-autofocus.directive';
import { RealPropertySearchLotNoComponent } from './real-property-search-lot-no/real-property-search-lot-no.component';
import { NgxPrintModule } from 'ngx-print';
import { RealPropertyAssessmentRollComponent } from './real-property-assessment-roll/real-property-assessment-roll.component';
import { MergeOfLandsComponent } from './merge-of-lands/merge-of-lands.component';
import { SingleUseLandComponent } from './merge-of-lands/single-use-land/single-use-land.component';
import { MixUseLandComponent } from './merge-of-lands/mix-use-land/mix-use-land.component';
import { ReviseComponent } from './revise/revise.component';
import { RealPropertyPrintComponent } from './real-property-print/real-property-print.component';

@NgModule({
  declarations: [
    RealPropertyComponent,
    RealPropertyDetailsComponent,
    RealPropertyCreateComponent,
    MatInputAutofocusDirective,
    RealPropertySearchLotNoComponent,
    RealPropertyAssessmentRollComponent,
    MergeOfLandsComponent,
    SingleUseLandComponent,
    MixUseLandComponent,
    ReviseComponent,
    RealPropertyPrintComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RealPropertyRoutingModule,
    MatSelectModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    FileUploadModule,
    NgxPrintModule
  ]
})
export class RealPropertyModule { }
