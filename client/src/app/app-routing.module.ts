import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: {breadcrumb: 'Home'} },
  { path: 'about', component: AboutComponent, data: {breadcrumb: 'About'} },
  { path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'} },
  { path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'} },
  { path: 'real-property', loadChildren: () => import('./real-property/real-property.module').then(mod => mod.RealPropertyModule), 
    data: {breadcrumb: 'Real Property'}, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    data: {breadcrumb: 'Admin Panel'} },
  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: {breadcrumb: {skip: true}} },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
