import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrdersService } from 'src/app/service/orders.service';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class OrdersPageComponent {
  orders: any[] = [];
  totalOrders: number = 11;
  loading: boolean = true;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private orderService: OrdersService
  ) {}

  loadOrdersLazy(event: TableLazyLoadEvent) {
    this.loading = true;
    this.orderService.getAdminOrders(event.first || 0).subscribe(
      (response: any) => {
        console.log(response);
        this.loading = false;
        this.orders = response.orders;
        this.totalOrders = response.total;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
}
