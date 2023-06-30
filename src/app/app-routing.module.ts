import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'super'] },
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
      {
        path: 'admins',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/admins/admins.module').then((m) => m.AdminsModule),
      },
      {
        path: 'vouchers',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/voucher/voucher.module').then((m) => m.VoucherModule),
      },
      {
        path: 'categories',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            (m) => m.CategoryModule
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
        path: 'bases',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/base/base.module').then((m) => m.BaseModule),
      },
      {
        path: 'flavors',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/flavor/flavor.module').then((m) => m.FlavorModule),
      },
      {
        path: 'toppings',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/topping/topping.module').then((m) => m.ToppingModule),
      },
      {
        path: 'topping-types',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/topping-type/topping-type.module').then(
            (m) => m.ToppingTypeModule
          ),
      },
      {
        path: 'profile',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/admin-profile/admin-profile.module').then(
            (m) => m.AdminProfileModule
          ),
      },
      {
        path: 'adminStore',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/admin-store/admin-store.module').then(
            (m) => m.AdminStoreModule
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
