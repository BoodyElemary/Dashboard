import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfilePageComponent } from './admin-profile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';

const routes: Routes = [
  {
    path: '',
    component: AdminProfilePageComponent,
  },
];

@NgModule({
  declarations: [AdminProfilePageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    MessagesModule,
    ConfirmDialogModule,
    InputTextModule,
    FormsModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AdminProfileModule {}
