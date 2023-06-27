import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public loginService: LoginService) { }
}
