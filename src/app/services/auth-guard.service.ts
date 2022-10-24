import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, public auth: AuthService) { }

  canActivate(): boolean{
    if(!this.auth.isAthenticated()){
      this.router.navigate(['inicio-sesion']);
      return false;
    }
    return true;
  }
}
