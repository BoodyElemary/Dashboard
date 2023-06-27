import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {

  constructor( public loginService: LoginService) { }
}
