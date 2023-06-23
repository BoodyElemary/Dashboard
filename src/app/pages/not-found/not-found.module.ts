import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
  {
    path: '',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule, ButtonModule],
})
export class NotFoundModule {}
