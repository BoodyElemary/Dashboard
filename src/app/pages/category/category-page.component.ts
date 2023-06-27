import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CategoryPageComponent {
  categories: any = [];
  isNewCategory: boolean = false;
  imageFile: File | null = null;
  newCategory: any = { name: '', description: '' };
  category: any = { name: '', description: '' };
  displayAddCategoryDialog: boolean = false;
  displayEditCategoryDialog: boolean = false;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  showAddCategoryDialog() {
    this.isNewCategory = true;
    this.newCategory = { name: '', description: '' };
    this.imageFile = null;
    this.displayAddCategoryDialog = true;
  }

  hideAddCategoryDialog() {
    this.displayAddCategoryDialog = false;
    this.imageFile = null;
  }

  showDialogToEdit(category: any) {
    this.category = category;
    this.displayEditCategoryDialog = true;
    this.imageFile = null;
  }
  hideDialogToEdit() {
    this.category = { name: '', description: '' };
    this.displayEditCategoryDialog = false;
    this.imageFile = null;
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data.data;
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

  createCategory() {
    if (this.imageFile) {
      this.categoryService
        .createCategory(this.newCategory, this.imageFile)
        .subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category created successfully',
            });
            this.loadCategories();
            this.hideAddCategoryDialog();
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
              detail: 'Error creating category!',
            });
            console.log(error);
            // this.hideAddCategoryDialog();
          }
        );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error Add category image!',
      });
    }
  }

  updateCategory() {
    this.categoryService
      .updateCategory(this.category._id, this.category, this.imageFile)
      .subscribe(
        (data) => {
          this.hideDialogToEdit();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category updated successfully',
          });
          this.loadCategories();
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
            detail: 'Error updating category!',
          });
          console.log(error);
        }
      );
  }

  softDeleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this store?',
      accept: () => {
        this.categoryService.softDeleteCategory(id).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category deleted successfully',
            });
            this.loadCategories();
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
              detail: 'Error deleting category!',
            });
            console.log(error);
          }
        );
      },
    });
  }

  hardDeleteCategory(id: string) {
    this.categoryService.hardDeleteCategory(id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCategoryImageChange(event: any) {
    if (event.currentFiles && event.currentFiles.length) {
      this.imageFile = event.currentFiles[0];
    }
  }
}
