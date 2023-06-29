import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToppingTypeService } from 'src/app/service/topping-type.service';

@Component({
  selector: 'app-topping-type-page',
  templateUrl: './topping-type-page.component.html',
  styleUrls: ['./topping-type-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ToppingTypePageComponent {
  toppingTypes: any = [];
  toppingType: any = { type: '', price: 0.01 };
  newToppingType: any = { type: '', price: 0.01 };
  displayAddToppingTypeDialog: boolean = false;
  displayEditToppingTypeDialog: boolean = false;

  constructor(
    private toppingTypeService: ToppingTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getToppingTypes();
  }

  getToppingTypes() {
    this.toppingTypeService.getToppingTypes().subscribe(
      (res) => {
        this.toppingTypes = res.data;
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

  getToppingType(id: string) {
    this.toppingTypeService.getToppingType(id).subscribe((res) => {
      console.log(res.data);
    });
  }

  createToppingType() {
    this.toppingTypeService.createToppingType(this.newToppingType).subscribe(
      () => {
        this.getToppingTypes();
        this.displayAddToppingTypeDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Topping Type created successfully',
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

  updateToppingType() {

    this.toppingTypeService
      .updateToppingType(this.toppingType._id, this.toppingType)
      .subscribe(
        () => {
          this.getToppingTypes();
          this.displayEditToppingTypeDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Topping Type created successfully',
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

  softDeleteToppingType(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Topping Type?',
      accept: () => {
        this.toppingTypeService.softDeleteToppingType(id).subscribe(
          () => {
            this.getToppingTypes();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Topping Type deleted successfully',
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

  hardDeleteToppingType(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Topping Type?',
      accept: () => {
        this.toppingTypeService.hardDeleteToppingType(id).subscribe(
          () => {
            this.getToppingTypes();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Topping Type deleted successfully',
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

  getToppingTypeItems(id: string) {
    this.toppingTypeService.getToppingTypeItems(id).subscribe((res) => {
      console.log(res.data);
    });
  }
  showAddToppingTypeDialog() {
    this.newToppingType = {
      type: '',
      price: 0.01,
    };
    this.displayAddToppingTypeDialog = true;
  }

  hideAddToppingTypeDialog() {
    this.displayAddToppingTypeDialog = false;
  }

  showDialogToEdit(toppingType: any) {
    this.toppingType = toppingType;
    this.displayEditToppingTypeDialog = true;
  }
  hideDialogToEdit() {
    this.displayEditToppingTypeDialog = false;
  }
}
