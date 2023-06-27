import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flavor-page',
  templateUrl: './flavor-page.component.html',
  styleUrls: ['./flavor-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FlavorPageComponent {}
