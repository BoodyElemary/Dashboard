import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'customers',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },
      {
        path: 'products',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'store',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/store/store.module').then((m) => m.StoreModule),
      },
      {
        path: 'orders',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'customer/:id',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/single-customer/single-customer.module').then(
            (m) => m.SingleCustomerModule
          ),
      },
    ],
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
