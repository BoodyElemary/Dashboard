import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrdersService } from 'src/app/service/orders.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-super-order-pages',
  templateUrl: './super-order-pages.component.html',
  styleUrls: ['./super-order-pages.component.scss'],
  providers: [ConfirmationService, MessageService, DecimalPipe],
})
export class SuperOrderPagesComponent {
  orders: any[] = [];
  totalOrders: number = 11;
  loading: boolean = true;
  displayEditVoucherDialog: boolean = false;
  orderStatus: string = '';
  singleOrderDetails: boolean = false;
  singleOrder: any;
  total: number = 0;
  current: string = 'all';
  currentStores: any[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private orderService: OrdersService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.orderService.getAllStores().subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadOrdersLazy(event: TableLazyLoadEvent) {
    this.loading = true;
    // this.orderService.getAdminOrders(event.first || 0).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     this.loading = false;
    //     this.orders = response.orders;
    //     this.totalOrders = response.total;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.loading = false;
    //   }
    // );
    this.orderService.getSuperOrders(this.current, event.first || 0).subscribe(
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
    this.singleOrder = order;
    this.displayEditVoucherDialog = true;
  }

  showSingleOrder(order: any) {
    this.singleOrder = order;
    this.singleOrderDetails = true;
    console.log(this.singleOrder);
    // console.log(this.singleOrder.orderedProducts[0].product.price);
    // this.total =
    //   Number(this.singleOrder.quantity) *
    //   Number(this.singleOrder.product.product.price);
    // console.log(this.total);
  }

  // loadProducts() {

  //   if (this.current === 'all') {
  //     this.productService.getAllProducts().subscribe(
  //       (data) => {
  //         this.products = data.data;
  //         this.isLoading = false;
  //       },
  //       (error) => {
  //         this.isLoading = false;

  //         if (error.status === 409) {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Error',
  //             detail: 'Already logged in from another device!',
  //           });
  //           setInterval(() => {
  //             this.router.navigate(['/login']);
  //           }, 2000);
  //         }
  //         console.log(error);
  //       }
  //     );
  //   } else {
  //     this.categoryService.getCategoryProducts(this.current).subscribe(
  //       (data) => {
  //         this.products = data.data;
  //         this.isLoading = false; // Finish loading
  //       },
  //       (error) => {
  //         if (error.status === 409) {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Error',
  //             detail: 'Already logged in from another device!',
  //           });
  //           setInterval(() => {
  //             this.router.navigate(['/login']);
  //           }, 2000);
  //         }
  //         console.log(error);
  //         this.isLoading = false; // Finish loading in case of an error
  //       }
  //     );
  //   }
  // }

  hideDialogToEdit() {
    this.displayEditVoucherDialog = false;
  }

  toNumber(item: string) {
    return parseFloat(item);
  }
  handleTotal(price: any, quantity: any): any {
    return (parseFloat(price) * parseInt(quantity)).toFixed(2);
  }

  updateStatus() {
    // Replace with the actual order ID
    const orderId = this.singleOrder?._id;
    const data = { status: this.orderStatus }; // Assuming the data to be sent includes the 'status' property
    console.log(data);
    this.orderService.editOrderStatus(orderId, data).subscribe(
      () => {
        // Handle the success response
        console.log('Order status updated successfully');
        // Perform any necessary actions, such as fetching the updated orders or displaying a success message
        this.loadOrdersLazy({}); // Refresh the order list by calling the loadOrdersLazy function or any other method to fetch the updated orders
        this.hideDialogToEdit();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order status updated successfully',
        });
      },
      (error) => {
        // Handle the error response
        console.error('Failed to update order status', error);
        // Perform any necessary error handling, such as displaying an error message
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.statusText,
        });
      }
    );
  }
}
