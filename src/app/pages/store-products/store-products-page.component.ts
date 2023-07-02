import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { LoginService } from 'src/app/service/login.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-store-products-page',
  templateUrl: './store-products-page.component.html',
  styleUrls: ['./store-products-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class StoreProductsPageComponent implements OnInit {
  store: any;
  current: string = 'all';

  currentCategories: any[] = [];
  products: any = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private titleService: Title,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Bobazona | Manage Products');

    this.loadProducts();
    this.loadCategories();
    this.store = this.loginService.getStoreId();
  }

  loadProducts() {
    this.isLoading = true;

    if (this.current === 'all') {
      this.productService.getAllProducts().subscribe(
        (data) => {
          this.products = data.data;
          this.isLoading = false;
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
          }
          console.log(error);
        }
      );
    } else {
      this.categoryService.getCategoryProducts(this.current).subscribe(
        (data) => {
          this.products = data.data;
          this.isLoading = false; // Finish loading
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
          console.log(error);
          this.isLoading = false; // Finish loading in case of an error
        }
      );
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.currentCategories = [{ label: 'All', value: 'all' }];
        data.data.forEach((category: any) => {
          this.currentCategories.push({
            label: category.name,
            value: category._id,
          });
        });
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
    );
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  toggleStatus(id: string, status: any) {
    this.productService
      .updateStoreProductStatus(id, { availability: !status })
      .subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product updated successfully',
          });
          this.loadProducts();
          console.log(data);
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
      );
  }
  getStoreProductStatus(status: any) {
    let result: boolean = true;
    status.forEach((store: any) => {
      if (store.store === this.store) {
        result = store.availability;
      }
    });
    return result;
  }
}
