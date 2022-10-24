import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { nameRoleInfluencer } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  banner_1 = `${environment.URL_SERVE}assets/image/banner-1.jpg`;

  nameRoleInfluencer: string = nameRoleInfluencer;
  data_usuario: IUsuario;

  constructor(
    private authService: AuthService,
  ) { 
    this.data_usuario = this.authService.getDataLogin();
  }

  ngOnInit(): void {
  }
  isHadRole(role): boolean{
    return this.data_usuario.role == role;
  }

}
