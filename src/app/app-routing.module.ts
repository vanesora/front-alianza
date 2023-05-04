import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstructionComponent } from './screens/construction/construction.component';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () =>
      import('./screens/customer/customer.module').then(
        (m) => m.CustomerModule
      ),
  },
  {
    path: 'new-customer',
    loadChildren: () =>
      import('./screens/new-customer/new-customer.module').then(
        (m) => m.NewCustomerModule
      ),
  },
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ConstructionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
