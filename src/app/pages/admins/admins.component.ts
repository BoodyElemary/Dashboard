import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StoreService } from 'src/app/service/store.service';


@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AdminsComponent implements OnInit, OnDestroy, OnChanges {
  admins: any = [];
  selectedAdmin: any;
  displayDialog: boolean = false;
  isNewAdmin: boolean = false;
  admin: any = { id: '', fullName: '', store: '' };
  newAdmin: any = { fullName: '', store: '', password: '' };
  private subscription: Subscription = new Subscription();
  displayAddAdminDialog: boolean = false;
  stores: any[] = [];
  passwordType = 'password';
  get password() {
    return this.newAdmin.password;
  }
  searchQuery: string = '';
  searchResults$: Observable<any> | undefined;

  constructor(
    private storeService: StoreService,
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.admin = { id: '', fullName: '', store: '' };
    this.loadAdmins();
    this.displayAddAdminDialog = false;
    this.storeService.getStores().subscribe(
      (data) => {
        this.stores = data.data;
        console.log(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadAdmins() {
    this.subscription.add(
      this.adminService.getAllAdmins().subscribe(
        (data) => {
          this.admins = data;
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  showDialogToEdit(admin: any) {
    this.isNewAdmin = false;
    this.admin = {
      id: admin._id,
      fullName: admin.fullName,
      store: admin.store._id,
    };
    this.displayDialog = true;
  }

  save() {
    if (this.isNewAdmin) {
      this.subscription.add(
        this.adminService.addNewAdmin(this.newAdmin).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Admin added successfully',
            });
            this.loadAdmins();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error adding admin',
            });
            console.log(error);
          }
        )
      );
      this.displayAddAdminDialog = false;
    } else {
      this.subscription.add(
        this.adminService.updateAdmin(this.admin).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Admin updated successfully',
            });
            this.loadAdmins();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error updating admin',
            });
            console.log(error);
          }
        )
      );
    }
    this.displayDialog = false;
  }

  delete(id:string) {
    this.subscription.add(
      this.adminService.deleteAdmin(id).subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Admin deleted successfully',
          });
          this.loadAdmins();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error deleting admin',
          });
          console.log(error);
        }
      )
    );
    this.displayDialog = false;
  }

  onRowSelect(event: any) {
    this.isNewAdmin = false;
    this.admin = { ...event.data };
    this.displayDialog = true;
  }

  confirmDelete(id:string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this admin?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(id);
      },
      reject: () => {},
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  print(a: any) {
    console.log(a);
  }
  showAddAdminDialog() {
    this.isNewAdmin = true;
    this.newAdmin = { fullName: '', store: '', password: '' };
    this.displayAddAdminDialog = true;
  }

  hideAddAdminDialog() {
    this.displayAddAdminDialog = false;
  }
  onInputSearch(event: any) {
    console.log(event);
  }
  search() {
    this.searchQuery
      ? this.subscription.add(
          this.adminService.searchAdmins(this.searchQuery).subscribe(
            (data) => {
              this.admins = data;
            },
            (error) => {
             this.loadAdmins();
            }
          )
        )
      : (this.loadAdmins());
  }
}
