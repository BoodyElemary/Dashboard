import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToppingService } from 'src/app/service/topping.service';
import { ToppingTypeService } from 'src/app/service/topping-type.service';
@Component({
  selector: 'app-topping-page',
  templateUrl: './topping-page.component.html',
  styleUrls: ['./topping-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ToppingPageComponent {
  toppingTypes: any = [];

  toppings: any[] = [];
  topping: any = {
    item: '',
    toppingType: '',
  };
  newTopping: any = {
    item: '',
    toppingType: '',
  };
  displayAddToppingDialog: boolean = false;
  displayEditToppingDialog: boolean = false;

  constructor(
    private toppingTypeService: ToppingTypeService,
    private toppingService: ToppingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getAllToppings();
    this.getToppingTypes();
  }

  getToppingTypes() {
    this.toppingTypeService.getToppingTypes().subscribe(
      (data) => {
        data.data.forEach((toppingType: any) => {
          this.toppingTypes.push({
            label: toppingType.type,
            value: toppingType._id,
          });
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

  getAllToppings() {
    this.toppingService.getAllToppings().subscribe(
      (data: any) => {
        this.toppings = data.data;
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

  addNewTopping() {
    this.toppingService.addNewTopping(this.newTopping).subscribe(
      () => {
        this.getAllToppings();
        this.displayAddToppingDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Topping created successfully',
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

  updateTopping() {
    this.toppingService.updateTopping(this.topping).subscribe(
      () => {
        this.getAllToppings();
        this.displayEditToppingDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Topping updated successfully',
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

  deleteTopping(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Topping?',
      accept: () => {
        this.toppingService.deleteTopping(id).subscribe(
          () => {
            this.getToppingTypes();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Topping deleted successfully',
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

  deleteToppingPermanently(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Topping?',
      accept: () => {
        this.toppingService.deleteToppingPermanently(id).subscribe(
          () => {
            this.getToppingTypes();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Topping deleted successfully',
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

  showAddToppingDialog() {
    this.newTopping = {
      item: '',
      toppingType: '',
    };
    this.displayAddToppingDialog = true;
  }

  hideAddToppingDialog() {
    this.displayAddToppingDialog = false;
  }

  showDialogToEdit(topping: any) {
    this.topping = topping;
    this.displayEditToppingDialog = true;
  }
  hideDialogToEdit() {
    this.displayEditToppingDialog = false;
  }
}
