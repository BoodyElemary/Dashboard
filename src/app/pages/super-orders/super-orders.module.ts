import { NgModule } from '@angular/core';
import { SuperOrderPagesComponent } from './super-order-pages.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    component: SuperOrderPagesComponent,
  },
];

@NgModule({
  declarations: [SuperOrderPagesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    MessagesModule,
    ConfirmDialogModule,
    FileUploadModule,
    ProgressSpinnerModule,
    InputNumberModule,
    DividerModule,
  ],
  providers: [ConfirmationService, MessageService, DatePipe, DecimalPipe],
})
export class SuperOrdersModule {}
