import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  storeName: string = '';
  sidebarVisible: boolean = false;
  @Input() newOrderData: any;

  constructor(
    public layoutService: LayoutService,
    public loginService: LoginService
  ) {}

  logger() {
    console.log(this.newOrderData);
  }
}
