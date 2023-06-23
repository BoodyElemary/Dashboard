import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersPageComponent } from './orders-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OrdersPageComponent,
  },
];

@NgModule({
  declarations: [OrdersPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class OrdersModule {}
