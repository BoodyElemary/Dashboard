import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToppingTypePageComponent } from './topping-type-page.component';
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

const routes: Routes = [
  {
    path: '',
    component: ToppingTypePageComponent,
  },
];

@NgModule({
  declarations: [ToppingTypePageComponent],
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
  ],
})
export class ToppingTypeModule {}
