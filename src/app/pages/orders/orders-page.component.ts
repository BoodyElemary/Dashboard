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
  displayEditVoucherDialog: boolean = false;
  orderStatus: string = '';

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
  showDialogToEdit(order: any) {
    console.log(order);
    this.orderStatus = order.status;
    console.log(this.orderStatus);

    this.displayEditVoucherDialog = true;
  }

  // updateVoucher() {
  //   this.voucherService.updateVoucher(this.voucher._id, this.voucher).subscribe(
  //     () => {
  //       this.getVouchers();
  //       this.hideDialogToEdit();
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Success',
  //         detail: 'Voucher updated successfully',
  //       });
  //     },
  //     (error) => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error',
  //         detail: error.statusText,
  //       });
  //       console.log(error);
  //     }
  //   );
  // }

  // hideAddVoucherDialog() {
  //   this.displayAddVoucherDialog = false;
  // }

  // showDialogToEdit(voucher: any) {
  //   this.voucher = voucher;
  //   this.displayEditVoucherDialog = true;
  // }
  hideDialogToEdit() {
    this.displayEditVoucherDialog = false;
  }
  updateStatus() {}
}
