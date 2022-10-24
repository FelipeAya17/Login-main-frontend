import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EventLoadingService } from 'src/app/services/event-loading.service';
import { TiendasService } from 'src/app/services/tiendas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seleccionar-tienda-form',
  templateUrl: './seleccionar-tienda-form.component.html'
})
export class SeleccionarTiendaFormComponent implements OnInit {

  @Input() tienda_seleccionada: boolean;
  @Output() eventEmitter = new EventEmitter<any>();

  seleccionarTiendaForm;
  lista_tiendas_acceso_usuario: any[] = [];

  data_usuario: IUsuario;
  is_loading: boolean = false;
  is_submit_form: boolean = false;
  _loading: string = `${environment.URL_SERVE}assets/image/loading.gif`;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private tiendasService: TiendasService,
    private eventLoadingService: EventLoadingService,
  ) { 
    this.data_usuario = this.authService.getDataLogin();
    this.seleccionarTiendaForm = this.formBuilder.group({
      codigo_tienda: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getListaTiendas();
    this.eventLoadingService.notifyOnStoped.subscribe(item => {
      this.is_loading = false;
    });
  }
  // getListatiendasUsuario(){
  //   this.is_loading = true;
  //   this.tiendasService.getListaTiendasUsuarios(this.data_usuario.id).subscribe(response => {
  //     this.lista_tiendas_acceso_usuario = response.data.tiendas_usuarios.map(item => {
  //       return {
  //         id: item.codigo_tienda,
  //         name: `${item.codigo_tienda} - ${item.nombre_tienda}`
  //       };
  //     });
  //     this.is_loading = false;
  //     if(this.lista_tiendas_acceso_usuario.length == 1 && !this.tienda_seleccionada){
  //       this.seleccionarTiendaForm.pathValue({
  //         codigo_tienda: this.lista_tiendas_acceso_usuario[0].id
  //       });
  //       this.seleccionarTienda();
  //     }
  //   });
  // }

  getListaTiendas(){
    this.is_loading = true;
    this.tiendasService.getListasTiendas().subscribe(response => {
      this.lista_tiendas_acceso_usuario = response.data.tiendas.map(item => {
        return {
          id: item.codigo_tienda,
          name: `${item.codigo_tienda} - ${item.nombre_tienda}`
        };
      });
      this.is_loading = false;
      if(this.lista_tiendas_acceso_usuario.length == 1 && !this.tienda_seleccionada){
        this.seleccionarTiendaForm.pathValue({
          codigo_tienda: this.lista_tiendas_acceso_usuario[0].id
        });
        this.seleccionarTienda();
      }
    });
  }
   modalClose(){
     this.activeModal.close();
   }

  seleccionarTienda(){
    this.is_submit_form = true;
    if(this.seleccionarTiendaForm.valid){
      this.toastr.success('Tienda seleccionada');
      let tienda_seleccionada = this.lista_tiendas_acceso_usuario.filter(item => item.id == this.seleccionarTiendaForm.value.codigo_tienda)[0];
      localStorage.setItem('DATA_TIENDA_INGRESO', JSON.stringify(tienda_seleccionada));
      this.modalClose();
      this.eventEmitter.emit(tienda_seleccionada);
      window.location.reload();
    }else{
      this.toastr.error('Faltan campos por ingresar');
    }
  }

}
