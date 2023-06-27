import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topping-type-page',
  templateUrl: './topping-type-page.component.html',
  styleUrls: ['./topping-type-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ToppingTypePageComponent {}
