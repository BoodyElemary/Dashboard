import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ToppingTypeService {
  constructor(public loginService: LoginService) {}
}
