import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToppingService } from 'src/app/service/topping.service';
@Component({
  selector: 'app-topping-page',
  templateUrl: './topping-page.component.html',
  styleUrls: ['./topping-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ToppingPageComponent {
  constructor(
    private toppingService: ToppingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
}
