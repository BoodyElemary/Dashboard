import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-voucher-page',
  templateUrl: './voucher-page.component.html',
  styleUrls: ['./voucher-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class VoucherPageComponent {}
