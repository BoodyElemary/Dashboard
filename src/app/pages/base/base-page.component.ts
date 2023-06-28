import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class BasePageComponent {
  constructor(
    private baseService: BaseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  bases: any[] = [];
  base: any = {
    name: '',
    price: 0.01,
  };
  newBase: any = {
    name: '',
    price: 0.01,
  };
  imageFile: File | null = null;
  displayAddBaseDialog: boolean = false;
  displayEditBaseDialog: boolean = false;

  ngOnInit(): void {
    this.getAllBases();
  }
  getAllBases() {
    this.baseService.getAllBases().subscribe(
      (response: any) => {
        if (response.success) {
          this.bases = response.data;
          console.log(response.data);
        } else {
          console.log(response.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createBase() {
    if (this.imageFile) {
      this.baseService.createBase(this.newBase, this.imageFile).subscribe(
        () => {
          this.getAllBases();
          this.displayAddBaseDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Base created successfully',
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
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error Add base image!',
      });
    }
  }

  updateBase() {
    this.baseService
      .updateBase(this.base._id, this.base, this.imageFile)
      .subscribe(
        () => {
          this.getAllBases();
          this.displayEditBaseDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Base updated successfully',
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

  deleteBase(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this voucher?',
      accept: () => {
        this.baseService.deleteBase(id).subscribe(
          () => {
            this.getAllBases();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Base deleted successfully',
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

  showAddBaseDialog() {
    this.newBase = {
      name: '',
      price: 0.01,
    };
    this.imageFile = null;
    this.displayAddBaseDialog = true;
  }

  hideAddBaseDialog() {
    this.newBase = {};
    this.imageFile = null;
    this.displayAddBaseDialog = false;
  }

  showEditBaseDialog(base: any) {
    this.base = base;
    this.imageFile = null;
    this.displayEditBaseDialog = true;
  }

  hideEditBaseDialog() {
    this.base = {};
    this.imageFile = null;
    this.displayEditBaseDialog = false;
  }

  onBaseImageChange(event: any) {
    if (event.currentFiles && event.currentFiles.length) {
      this.imageFile = event.currentFiles[0];
    }
  }
}
