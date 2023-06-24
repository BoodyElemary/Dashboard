import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductPageComponent } from './add-product-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add-product',
    component: AddProductPageComponent,
  },
];

@NgModule({
  declarations: [AddProductPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class AddProductModule {}
