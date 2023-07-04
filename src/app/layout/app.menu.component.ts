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
              routerLink: ['/store-products'],
            },
            {
              label: 'Store',
              icon: 'pi pi-fw pi-home',
              routerLink: ['/adminStore'],
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
              routerLink: ['/superDashboard'],
            },
          ],
        },
        {
          label: 'Adminstration',
          items: [
            {
              label: 'Stores',
              icon: 'pi pi-fw pi-home',
              routerLink: ['/store'],
            },
            {
              label: 'Admins',
              icon: 'pi pi-fw pi-user-plus',
              routerLink: ['/admins'],
            },
            {
              label: 'Customers',
              icon: 'pi pi-fw pi-users',
              routerLink: ['/customers'],
            },
            {
              label: 'Orders',
              icon: 'pi pi-fw pi-shopping-cart',
              routerLink: ['/super-orders'],
            },
            {
              label: 'Vouchers',
              icon: 'pi pi-fw pi-ticket',
              routerLink: ['/vouchers'],
            },
          ],
        },
        {
          label: 'Products',
          items: [
            {
              label: 'Categories',
              icon: 'pi pi-fw pi-th-large',
              routerLink: ['/categories'],
            },
            {
              label: 'Products',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/products'],
            },
            {
              label: 'Bases',
              icon: 'pi pi-fw pi-minus',
              routerLink: ['/bases'],
            },
            {
              label: 'Flavors',
              icon: 'pi pi-fw pi-angle-up',
              routerLink: ['/flavors'],
            },
            {
              label: 'Toppings',
              icon: 'pi pi-fw pi-caret-up',
              routerLink: ['/toppings'],
            },
            {
              label: 'Topping types',
              icon: 'pi pi-fw pi-forward',
              routerLink: ['/topping-types'],
            },
          ],
        },
      ];
    }
  }
}
