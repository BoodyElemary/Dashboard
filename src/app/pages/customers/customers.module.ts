import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersPageComponent } from './customers-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CustomersPageComponent,
  },
];

@NgModule({
  declarations: [CustomersPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class CustomersModule {}
