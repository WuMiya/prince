import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { TopChartsComponent } from './top-charts/top-charts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'top-charts', component: TopChartsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: false }) ],
  exports:[RouterModule]
})
export class AppRoutingModule { 
  routes: any = routes;
}

export const routingComponents = [HomeComponent, SalesComponent, TopChartsComponent, PageNotFoundComponent];