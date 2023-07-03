import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/service/store.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class StorePageComponent implements OnInit {
  stores: any[] = [];
  store: any = {
    name: '',
    map: '',
    location: '',
    phone: '',
    workingHours: [
      { day: 'Monday', startHour: 0, endHour: 0 },
      { day: 'Tuesday', startHour: 0, endHour: 0 },
      { day: 'Wednesday', startHour: 0, endHour: 0 },
      { day: 'Thursday', startHour: 0, endHour: 0 },
      { day: 'Friday', startHour: 0, endHour: 0 },
      { day: 'Saturday', startHour: 0, endHour: 0 },
      { day: 'Sunday', startHour: 0, endHour: 0 },
    ],
  };
  newStore: any = {
    name: '',
    map: '',
    location: '',
    phone: '',
    workingHours: [
      { day: 'Monday', startHour: 0, endHour: 0 },
      { day: 'Tuesday', startHour: 0, endHour: 0 },
      { day: 'Wednesday', startHour: 0, endHour: 0 },
      { day: 'Thursday', startHour: 0, endHour: 0 },
      { day: 'Friday', startHour: 0, endHour: 0 },
      { day: 'Saturday', startHour: 0, endHour: 0 },
      { day: 'Sunday', startHour: 0, endHour: 0 },
    ],
  };
  heroImageFile: File | null = null;
  pageImageFile: File | null = null;
  isNewStore: boolean = false;
  displayAddStoreDialog: boolean = false;
  displayDialog: boolean = false;
  searchQuery: string = '';
  hours: any[] = [
    { label: '12:00 AM', value: '0' },
    { label: '1:00 AM', value: '1' },
    { label: '2:00 AM', value: '2' },
    { label: '3:00 AM', value: '3' },
    { label: '4:00 AM', value: '4' },
    { label: '5:00 AM', value: '5' },
    { label: '6:00 AM', value: '6' },
    { label: '7:00 AM', value: '7' },
    { label: '8:00 AM', value: '8' },
    { label: '9:00 AM', value: '9' },
    { label: '10:00 AM', value: '10' },
    { label: '11:00 AM', value: '11' },
    { label: '12:00 PM', value: '12' },
    { label: '1:00 PM', value: '13' },
    { label: '2:00 PM', value: '14' },
    { label: '3:00 PM', value: '15' },
    { label: '4:00 PM', value: '16' },
    { label: '5:00 PM', value: '17' },
    { label: '6:00 PM', value: '18' },
    { label: '7:00 PM', value: '19' },
    { label: '8:00 PM', value: '20' },
    { label: '9:00 PM', value: '21' },
    { label: '10:00 PM', value: '22' },
    { label: '11:00 PM', value: '23' },
    { label: '11:59 PM', value: '24' },
  ];
  editHours: boolean = false;
  isLoading: boolean = false;

  constructor(
    private storeService: StoreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Bobazona | Manage Stores');

    this.getStores();
  }

  getStores(): void {
    this.isLoading = true;

    this.storeService.getStores().subscribe(
      (stores) => {
        this.isLoading = false;
        this.stores = stores.data;
        console.log(this.stores);
        console.log(stores);
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

  save(): void {
    if (!this.isNewStore) {
      if (!this.editHours) this.store.workingHours = null;
      this.storeService
        .updateStore(this.store, this.heroImageFile, this.pageImageFile)

        .subscribe(() => {
          this.getStores();
          this.store = {
            name: '',
            map: '',
            location: '',
            phone: '',
            workingHours: [
              { day: 'Monday', startHour: 0, endHour: 0 },
              { day: 'Tuesday', startHour: 0, endHour: 0 },
              { day: 'Wednesday', startHour: 0, endHour: 0 },
              { day: 'Thursday', startHour: 0, endHour: 0 },
              { day: 'Friday', startHour: 0, endHour: 0 },
              { day: 'Saturday', startHour: 0, endHour: 0 },
              { day: 'Sunday', startHour: 0, endHour: 0 },
            ],
          };
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Store updated successfully',
          });
        });
    } else {
      this.storeService
        .createStore(this.newStore, this.heroImageFile, this.pageImageFile)
        .subscribe(
          () => {
            this.getStores();
            this.newStore = {
              name: '',
              map: '',
              location: '',
              phone: '',
              workingHours: [
                { day: 'Monday', startHour: 0, endHour: 0 },
                { day: 'Tuesday', startHour: 0, endHour: 0 },
                { day: 'Wednesday', startHour: 0, endHour: 0 },
                { day: 'Thursday', startHour: 0, endHour: 0 },
                { day: 'Friday', startHour: 0, endHour: 0 },
                { day: 'Saturday', startHour: 0, endHour: 0 },
                { day: 'Sunday', startHour: 0, endHour: 0 },
              ],
            };
            this.displayAddStoreDialog = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Store created successfully',
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
  }

  showDialogToEdit(store: any): void {
    this.editHours = false;
    this.isNewStore = false;
    this.displayDialog = true;
    this.store = store;
    this.heroImageFile = null;
    this.pageImageFile = null;
  }

  hideDialogToEdit(): void {
    this.store = {
      name: '',
      map: '',
      location: '',
      phone: '',
      workingHours: [
        { day: 'Monday', startHour: 0, endHour: 0 },
        { day: 'Tuesday', startHour: 0, endHour: 0 },
        { day: 'Wednesday', startHour: 0, endHour: 0 },
        { day: 'Thursday', startHour: 0, endHour: 0 },
        { day: 'Friday', startHour: 0, endHour: 0 },
        { day: 'Saturday', startHour: 0, endHour: 0 },
        { day: 'Sunday', startHour: 0, endHour: 0 },
      ],
    };
    this.displayDialog = false;
  }

  confirmDelete(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this store?',
      accept: () => {
        this.storeService.softDeleteStore(id).subscribe(
          () => {
            this.getStores();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Store deleted successfully',
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

  hideAddStoreDialog(): void {
    this.displayAddStoreDialog = false;
    this.isNewStore = false;
    this.heroImageFile = null;
    this.pageImageFile = null;
  }

  showAddStoreDialog(): void {
    this.displayAddStoreDialog = true;
    this.isNewStore = true;
    this.newStore = {
      name: '',
      map: '',
      location: '',
      phone: '',
      workingHours: [
        { day: 'Monday', startHour: 0, endHour: 0 },
        { day: 'Tuesday', startHour: 0, endHour: 0 },
        { day: 'Wednesday', startHour: 0, endHour: 0 },
        { day: 'Thursday', startHour: 0, endHour: 0 },
        { day: 'Friday', startHour: 0, endHour: 0 },
        { day: 'Saturday', startHour: 0, endHour: 0 },
        { day: 'Sunday', startHour: 0, endHour: 0 },
      ],
    };
    this.heroImageFile = null;
    this.pageImageFile = null;
  }
  onHeroImageChange(event: any) {
    if (event.currentFiles && event.currentFiles.length) {
      this.heroImageFile = event.currentFiles[0];
    }
  }

  onPageImageChange(event: any) {
    if (event.currentFiles && event.currentFiles.length) {
      this.pageImageFile = event.currentFiles[0];
    }
  }
  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
