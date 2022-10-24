import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TercerosComponent } from './pages/terceros/terceros.component';
import { AuthGuardLoginService } from './services/auth-guard-login.service';
import { AuthGuardRoleService } from './services/auth-guard-role.service';
import { AuthGuardService } from './services/auth-guard.service';
import { nameRoleTesoreria, nameRoleVendedor } from './utils/constants';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'inicio-sesion',
    component: InicioSesionComponent,
    canActivate: [AuthGuardLoginService]
  },
  {
    path: 'terceros',
    canActivate: [AuthGuardRoleService],
    data: {
      nombre_role: [nameRoleVendedor, nameRoleTesoreria]
    },
    children: [
      {
        path: '',
        component: TercerosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
