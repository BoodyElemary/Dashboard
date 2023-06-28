import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStorePageComponent } from './admin-store-page.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: AdminStorePageComponent,
  },
];

@NgModule({
  declarations: [AdminStorePageComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class AdminStoreModule {}
