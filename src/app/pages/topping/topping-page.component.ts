import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topping-page',
  templateUrl: './topping-page.component.html',
  styleUrls: ['./topping-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ToppingPageComponent {}
