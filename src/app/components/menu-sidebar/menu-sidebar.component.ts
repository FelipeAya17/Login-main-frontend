import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { nameRoleAuditoria, nameRoleAuxiliarDiseno, nameRoleBodega, nameRoleContador, nameRoleInfluencer, nameRoleRepartidor, nameRoleSuperAdministrador, nameRoleTesoreria, nameRoleVendedor } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {


  data_usuario: IUsuario;

  nameRoleVendedor: string = nameRoleVendedor;
	nameRoleBodega: string = nameRoleBodega;
	nameRoleSuperAdministrador: string = nameRoleSuperAdministrador;
	nameRoleTesoreria: string = nameRoleTesoreria;
  nameRoleContador: string = nameRoleContador;
  nameRoleAuxiliarDiseno: string = nameRoleAuxiliarDiseno;
  nameRoleAuditoria: string = nameRoleAuditoria;
  nameRoleInfluencer: string = nameRoleInfluencer;
  nameRoleRepartidor: string = nameRoleRepartidor;

  logo_blanco = `${environment.URL_SERVE}assets/image/logo-blanco - copia.png`;

  constructor(
    private authService: AuthService,
  ) { 
    this.data_usuario = this.authService.getDataLogin();
  }

  ngOnInit(): void {}
  isHadRole(role, validate_admin = true): boolean {
		return this.data_usuario.role == role || (this.data_usuario.role == nameRoleSuperAdministrador && validate_admin);
	}

}
