import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService {

  constructor(private router: Router, public auth: AuthService) { }

  canActivate(): boolean{
    if(this.auth.isAthenticated()){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
