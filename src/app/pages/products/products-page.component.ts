import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';

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
  imageFile: File | null = null;
  newProduct: any = {
    name: '',
    price: 0,
    size: 'S',
    details: { brief: '', nutrition: '', ingredients: '' },
    category: '',
  };
  sizes: any[] = [
    { label: 'Small', value: 'S' },
    { label: 'Medium', value: 'M' },
    { label: 'Large', value: 'L' },
  ];
  product: any = {
    name: '',
    price: 0,
    size: 'S',
    details: { brief: '', nutrition: '', ingredients: '' },
  };
  displayAddProductDialog: boolean = false;
  displayEditProductDialog: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  showAddProductDialog() {
    this.newProduct = {
      name: '',
      price: 0,
      size: 'S',
      details: { brief: '', nutrition: '', ingredients: '' },
      category: '',
    };
    this.imageFile = null;
    this.displayAddProductDialog = true;
  }

  hideAddProductDialog() {
    this.newProduct = {
      name: '',
      price: 0,
      size: 'S',
      details: { brief: '', nutrition: '', ingredients: '' },
      category: '',
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
    this.newProduct = {
      name: '',
      price: 0,
      size: 'S',
      details: { brief: '', nutrition: '', ingredients: '' },
      category: '',
    };
    this.imageFile = null;
    this.displayEditProductDialog = false;
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    if (this.current === 'all') {
      this.productService.getAllProducts().subscribe(
        (data) => {
          this.products = data.data;
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
        }
      );
    } else {
      this.categoryService.getCategoryProducts(this.current).subscribe(
        (data) => {
          this.products = data.data;
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
              detail: 'Error creating product!',
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
    this.productService.updateProduct(this.product._id, this.product, this.imageFile).subscribe(
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
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error editing product!',
        });
        console.log(error);
      }
    );
  }

  softDeleteProduct(id: string) {
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
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error deleting product!',
        });
        console.log(error);
      }
    );
  }

  hardDeleteProduct(id: string) {
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
        }
        console.log(error);
      }
    );
  }
}
