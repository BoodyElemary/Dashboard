import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-single-customer-page',
  templateUrl: './single-customer-page.component.html',
  styleUrls: ['./single-customer-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class SingleCustomerPageComponent {}
