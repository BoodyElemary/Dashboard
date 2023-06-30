import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FlavorService } from 'src/app/service/flavor.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-flavor-page',
  templateUrl: './flavor-page.component.html',
  styleUrls: ['./flavor-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FlavorPageComponent implements OnInit {
  flavors: any = [];
  displayAddFlavorDialog: boolean = false;
  displayEditFlavorDialog: boolean = false;
  flavor: any = {
    name: '',
    price: 0.01,
  };
  newFlavor: any = {
    name: '',
    price: 0.01,
  };
  isLoading: boolean = false;

  constructor(
    private flavorService: FlavorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private titleService: Title
  ) {}
  ngOnInit() {
    this.titleService.setTitle('Bobazona | Manage Flavors');

    this.getFlavors();
  }

  getFlavors() {
    this.isLoading = true;

    this.flavorService.getFlavors().subscribe(
      (data) => {
        this.isLoading = false;
        this.flavors = data.data;
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

  createFlavor() {
    this.flavorService.createFlavor(this.newFlavor).subscribe(
      () => {
        this.getFlavors();
        this.displayAddFlavorDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Flavor created successfully',
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

  updateFlavor() {
    this.flavorService.updateFlavor(this.flavor._id, this.flavor).subscribe(
      () => {
        this.getFlavors();
        this.displayEditFlavorDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Flavor updated successfully',
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

  softDeleteFlavor(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this flavor?',
      accept: () => {
        this.flavorService.softDeleteFlavor(id).subscribe(
          () => {
            this.getFlavors();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Flavor deleted successfully',
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

  hardDeleteFlavor(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this flavor?',
      accept: () => {
        this.flavorService.hardDeleteFlavor(id).subscribe(
          () => {
            this.getFlavors();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Flavor deleted successfully',
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

  showAddFlavorDialog() {
    this.newFlavor = {
      name: '',
      price: 0.01,
    };
    this.displayAddFlavorDialog = true;
  }

  hideAddFlavorDialog() {
    this.displayAddFlavorDialog = false;
  }

  showDialogToEdit(flavor: any) {
    this.flavor = flavor;
    this.displayEditFlavorDialog = true;
  }
  hideEditFlavorDialog() {
    this.displayEditFlavorDialog = false;
  }
  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
