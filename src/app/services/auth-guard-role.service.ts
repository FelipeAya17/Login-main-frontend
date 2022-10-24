import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/i-usuario';
import { nameRoleSuperAdministrador } from '../utils/constants';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardRoleService implements CanActivate {

  constructor(
    private router: Router,
    public auth: AuthService,
    private authGuard: AuthGuardService,
    private toastr: ToastrService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authGuard.canActivate();
    let data_usuario: IUsuario = this.auth.getDataLogin();
    if(!route.data.nombre_role.includes(data_usuario.role) && data_usuario.role != nameRoleSuperAdministrador){
      this.toastr.error('No puede acceder a esta opción. Por favor contáctese con el administrador para más información', 'Acceso no permitido');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
