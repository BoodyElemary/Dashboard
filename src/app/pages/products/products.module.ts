import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
  },
];

@NgModule({
  declarations: [ProductsPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class ProductsModule {}
