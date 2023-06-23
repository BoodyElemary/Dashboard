import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCustomerPageComponent } from './single-customer-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SingleCustomerPageComponent,
  },
];

@NgModule({
  declarations: [SingleCustomerPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class SingleCustomerModule {}
