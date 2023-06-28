import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToppingTypeService } from 'src/app/service/topping-type.service';

@Component({
  selector: 'app-topping-type-page',
  templateUrl: './topping-type-page.component.html',
  styleUrls: ['./topping-type-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ToppingTypePageComponent {
  constructor(
    private toppingTypeService: ToppingTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
}
