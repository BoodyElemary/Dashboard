import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { VoucherService } from 'src/app/service/voucher.service';

@Component({
  selector: 'app-voucher-page',
  templateUrl: './voucher-page.component.html',
  styleUrls: ['./voucher-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class VoucherPageComponent {
  minExpireDate: string = '';

  vouchers = [];
  voucher: any = {
    code: '',
    percentage: 0.01,
    expireDate: '',
    status: 'applied',
  };
  newVoucher: any = {
    code: '',
    percentage: 0.01,
    expireDate: '',
    status: 'applied',
  };
  displayAddVoucherDialog: boolean = false;
  displayEditVoucherDialog: boolean = false;

  constructor(
    private voucherService: VoucherService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getVouchers();
    this.minExpireDate = new Date().toISOString().slice(0, 10);
  }

  getVouchers() {
    this.voucherService.getVouchers().subscribe(
      (data: any) => {
        this.vouchers = data.data;
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

  createVoucher() {
    this.voucherService.createVoucher(this.newVoucher).subscribe(
      () => {
        this.getVouchers();
        this.displayAddVoucherDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Voucher created successfully',
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

  updateVoucher() {
    this.voucherService.updateVoucher(this.voucher._id, this.voucher).subscribe(
      () => {
        this.getVouchers();
        this.hideDialogToEdit();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Voucher updated successfully',
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

  deleteVoucher(voucherId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this voucher?',
      accept: () => {
        this.voucherService.deleteVoucher(voucherId).subscribe(
          () => {
            this.getVouchers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Voucher deleted successfully',
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
      },
    });
  }
  showAddVoucherDialog() {
    this.newVoucher = {
      code: '',
      percentage: 0.01,
      status: 'applied',
    };
    this.displayAddVoucherDialog = true;
  }

  hideAddVoucherDialog() {
    this.displayAddVoucherDialog = false;
  }

  showDialogToEdit(voucher: any) {
    this.voucher = voucher;
    this.displayEditVoucherDialog = true;
  }
  hideDialogToEdit() {
    this.displayEditVoucherDialog = false;
  }
}
