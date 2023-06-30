import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  providers: [MessageService],

  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginPageComponent {
  fullName: string = '';
  password: string = '';
  role: string = 'admin';
  remember: boolean = false;
  isLoading: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Bobazona | Dashboard Login');
  }

  onSubmit() {
    this.isLoading = true;

    console.log(this.fullName, this.password, this.role, this.remember);
    this.loginService
      .login(this.fullName, this.password, this.role, this.remember)
      .then((success) => {
        this.isLoading = false;
        if (success) {
          // Navigate to the home page if login is successful
          this.router.navigate(['/']);
        } else {
          // Display an error message if login is unsuccessful
          this.messageService.add({
            severity: 'error',
            summary: 'Login failed',
            detail: 'Invalid name or password',
          });
        }
      })
      .catch((error) => {
        this.isLoading = false;
        console.error(error);
        // Display an error message if an error occurs during login
        this.messageService.add({
          severity: 'error',
          summary: 'Login failed',
          detail: 'An error occurred during login',
        });
      });
  }
  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
