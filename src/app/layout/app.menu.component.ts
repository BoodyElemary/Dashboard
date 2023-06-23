import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: ['/'],
          },
          {
            label: 'Customers',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/customers'],
          },
        ],
      },
      {
        label: 'Adminstration',
        items: [
          {
            label: 'Products',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/products'],
          },
          {
            label: 'Store',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/store'],
          },
          {
            label: 'Orders',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: ['/orders'],
          },
        ],
      },
    ];
  }
}
