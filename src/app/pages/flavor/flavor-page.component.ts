import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FlavorService } from 'src/app/service/flavor.service';
@Component({
  selector: 'app-flavor-page',
  templateUrl: './flavor-page.component.html',
  styleUrls: ['./flavor-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FlavorPageComponent {
  constructor(
    private flavorService: FlavorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
}
