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
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AdminsComponent implements OnInit, OnDestroy, OnChanges {
  admins: any = [];
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
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private storeService: StoreService,
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private titleService: Title
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.titleService.setTitle('Bobazona | Manage Admins');

    this.admin = { id: '', fullName: '', store: '' };
    this.loadAdmins();
    this.loadStores();
    this.displayAddAdminDialog = false;
  }

  loadStores() {
    this.storeService.getStores().subscribe(
      (data) => {
        this.stores = data.data;
        console.log(data.data);
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

  loadAdmins() {
    this.isLoading = true;

    this.subscription.add(
      this.adminService.getAllAdmins().subscribe(
        (data) => {
          this.isLoading = false;

          this.admins = data;
          console.log(data);
        },
        (error) => {
                    this.isLoading = false;

          if (error.status === 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Already logged in from another device!',
            });
            setInterval(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.statusText,
            });
          }
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
            if (error.status === 409) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Already logged in from another device!',
              });
              setInterval(() => {
                this.router.navigate(['/login']);
              }, 2000);
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.statusText,
              });
            }
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
            if (error.status === 409) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Already logged in from another device!',
              });
              setInterval(() => {
                this.router.navigate(['/login']);
              }, 2000);
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.statusText,
              });
            }
            console.log(error);
          }
        )
      );
    }
    this.displayDialog = false;
  }

  delete(id: string) {
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
          if (error.status === 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Already logged in from another device!',
            });
            setInterval(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.statusText,
            });
          }
          console.log(error);
        }
      )
    );
    this.displayDialog = false;
  }

  confirmDelete(id: string) {
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
              if (error.status === 409) {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Already logged in from another device!',
                });
                setInterval(() => {
                  this.router.navigate(['/login']);
                }, 2000);
              }
              this.loadAdmins();
            }
          )
        )
      : this.loadAdmins();
  }
  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
