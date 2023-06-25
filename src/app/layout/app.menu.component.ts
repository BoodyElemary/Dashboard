import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(
    public layoutService: LayoutService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    if (this.loginService.getRole() === 'admin') {
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
    } else if (this.loginService.getRole() === 'super') {
      this.model = [
        {
          label: 'Home',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-chart-bar',
              routerLink: ['/'],
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
              label: 'Stores',
              icon: 'pi pi-fw pi-home',
              routerLink: ['/store'],
            },
            {
              label: 'Orders',
              icon: 'pi pi-fw pi-shopping-cart',
              routerLink: ['/orders'],
            },
            {
              label: 'Admins',
              icon: 'pi pi-fw pi-user-plus',
              routerLink: ['/admins'],
            },
          ],
        },
      ];
    }
  }
}
