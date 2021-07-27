import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealPropertyComponent } from './real-property/real-property.component';

const routes: Routes = [
  {path: '', component: RealPropertyComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RealPropertyRoutingModule { }
