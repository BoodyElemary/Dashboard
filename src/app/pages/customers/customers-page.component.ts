import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { OrdersService } from 'src/app/service/orders.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CustomersPageComponent implements OnInit {
  customer: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isActive: false,
    isBlocked: false,
    createdAt: '',
  };
  displayCustomerDialog: boolean = false;

  customers: any[] = [];
  isLoading: boolean = false;

  constructor(
    private ordersService: OrdersService,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Bobazona | Manage Customers');

    this.getCustomers();
  }

  getCustomers() {
    this.isLoading = true;

    this.customerService.getAllCustomers().subscribe(
      (data: any) => {
        this.isLoading = false;
        this.customers = data;
      },
      (error) => {
                  this.isLoading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.statusText,
        });
        console.log(error);
      }
    );
  }

  updateCustomer(id: string, blockState: boolean) {
    this.customerService
      .updateCustomer(id, { isBlocked: blockState })
      .subscribe(
        () => {
          this.getCustomers();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Customer updated successfully',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.statusText,
          });
          console.log(error);
        }
      );
  }

  loadOrders() {
    console.log(this.customer.customerOrders);
    if (this.customer.customerOrders && this.customer.customerOrders.length) {
      this.customer.orders = [];
      this.customer.customerOrders.forEach((order: any) => {
        this.ordersService.getOrderById(order).subscribe(
          (data) => {
            this.customer.orders.push(data);
            console.log(data);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.statusText,
            });
          }
        );
      });
    }
  }

  showProfileDialog(customer: any) {
    this.customer = customer;
    this.loadOrders();
    this.displayCustomerDialog = true;
  }
  hideProfileDialog() {
    this.displayCustomerDialog = false;
  }
  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
