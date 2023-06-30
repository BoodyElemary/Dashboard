import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ProductsPageComponent implements OnInit {
  current: string = 'all';

  currentCategories: any[] = [];
  categories: any[] = [];
  products: any = [];
  isLoading: boolean = false;
  imageFile: File | null = null;
  newProduct: any = {
    name: '',
    price: 0.01,
    size: 'S',
    details: { brief: '', nutrition: '', ingredients: '' },
    category: '',
    subCategory: '',
  };
  sizes: any[] = [
    { label: 'Small', value: 'S' },
    { label: 'Medium', value: 'M' },
    { label: 'Large', value: 'L' },
  ];
  product: any = {
    name: '',
    price: 0.01,
    size: 'S',
    details: { brief: '', nutrition: '', ingredients: '' },
    category: '',

    subCategory: '',
  };
  displayAddProductDialog: boolean = false;
  displayEditProductDialog: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private titleService: Title
  ) {}

  showAddProductDialog() {
    this.newProduct = {
      name: '',
      price: 0.01,
      size: 'S',
      details: { brief: '', nutrition: '', ingredients: '' },
      category: '',
      subCategory: '',
    };
    this.imageFile = null;
    this.displayAddProductDialog = true;
  }

  hideAddProductDialog() {
    this.newProduct = {
      name: '',
      price: 0.01,
      size: 'S',
      details: { brief: '', nutrition: '', ingredients: '' },
      category: '',
      subCategory: '',
    };
    this.imageFile = null;
    this.displayAddProductDialog = false;
  }

  showEditProductDialog(product: any) {
    this.product = product;
    this.imageFile = null;
    this.displayEditProductDialog = true;
  }

  hideEditProductDialog() {
    this.imageFile = null;
    this.displayEditProductDialog = false;
  }

  ngOnInit() {
    this.titleService.setTitle('Bobazona | Manage Products');

    this.loadProducts();
    this.loadCategories();
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

  createProduct() {
    if (this.imageFile) {
      this.productService
        .createProduct(this.newProduct, this.imageFile)
        .subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product created successfully',
            });
            this.loadProducts();
            this.hideAddProductDialog();
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
        detail: 'Error Add product image!',
      });
    }
  }

  updateProduct() {
    this.productService
      .updateProduct(this.product._id, this.product, this.imageFile)
      .subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product updated successfully',
          });
          this.loadProducts();
          this.hideEditProductDialog();
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

  softDeleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      accept: () => {
        this.productService.softDeleteProduct(id).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product deleted successfully',
            });
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
      },
    });
  }

  hardDeleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      accept: () => {
        this.productService.hardDeleteProduct(id).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product deleted successfully',
            });
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
            }
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error deleting product!',
            });
            console.log(error);
          }
        );
      },
    });
  }

  onProductImageChange(event: any) {
    if (event.currentFiles && event.currentFiles.length) {
      this.imageFile = event.currentFiles[0];
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = [];
        this.currentCategories = [{ label: 'All', value: 'all' }];
        data.data.forEach((category: any) => {
          this.categories.push({ label: category.name, value: category._id });
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
}
