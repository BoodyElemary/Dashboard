import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-single-customer-page',
  templateUrl: './single-customer-page.component.html',
  styleUrls: ['./single-customer-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class SingleCustomerPageComponent {
  constructor(
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
}
