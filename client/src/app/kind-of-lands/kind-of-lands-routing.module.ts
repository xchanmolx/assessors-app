import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KindOfLandsComponent } from './kind-of-lands/kind-of-lands.component';

const routes: Routes = [
  { path: '', component: KindOfLandsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class KindOfLandsRoutingModule { }
