import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';

const routes: Routes = [
  {
    path: '',
    component: AdminsComponent,
  },
];

@NgModule({
  declarations: [AdminsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    MessagesModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AdminsModule {}
