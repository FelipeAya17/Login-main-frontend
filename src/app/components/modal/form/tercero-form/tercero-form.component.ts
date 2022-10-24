import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EventLoadingService } from 'src/app/services/event-loading.service';
import { ListasService } from 'src/app/services/listas.service';
import { NotifierModalGeneralService } from 'src/app/services/notifier-modal-general.service';
import { TercerosService } from 'src/app/services/terceros.service';
import { Functions } from 'src/app/utils/functions';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tercero-form',
  templateUrl: './tercero-form.component.html',
})
export class TerceroFormComponent implements OnInit {

  @Input() tercero_id: any = null;
  @Input() created_only_cliente: boolean = false;

  user_data: IUsuario;
  is_submit_form: boolean = false;
  is_loading: boolean = false;
  tercerosForm;

  lista_generos: any[] = [];
  lista_tipos_documentos: any[] = [];
  lista_country: any[] = [];
  lista_state: any[] = [];
  lista_city: any[] = [];
  lista_tipos_terceros: any[] = [
    {
      id: 'C',
      name: 'Cliente'
    },
    {
      id: 'V',
      name: 'Vendedor'
    },
    {
      id: 'A',
      name: 'Administrador'
    },
    {
      id: 'B',
      name: 'Bodega'
    },
    {
      id: 'T',
      name: 'Tesoreria'
    },
    {
      id: 'CON',
      name: 'Contador'
    },
    {
      id: 'AUX',
      name: 'Auxiliar diseño'
    },
    {
      id: 'AUD',
      name: 'Auditoria'
    },
    {
      id: 'EMB',
      name: 'Embajador New WAY'
    },
    {
      id: 'REP',
      name: 'Repartidor'
    }
  ];

  _loading: string = `${environment.URL_SERVE}assets/image/loading.gif`;

  constructor(
    private functions: Functions,
    private toastr: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private listasService: ListasService,
    private tercerosService: TercerosService,
    private eventLoadingService: EventLoadingService,
    private notifierModalGeneral: NotifierModalGeneralService
  ) { }

  ngOnInit(): void {
    this.getListaTipoDocumentos();
    this.getListaPaises();
    //this.seleccionarModoTercero();
    this.getListaGeneros();
    if(this.tercero_id != null){
      this.getTerceroById();
    }
    this.eventLoadingService.notifyOnStoped.subscribe(item => {
      this.is_loading = false;
    });
  }
  modalClose(){
    this.activeModal.close(); 
  }
  // seleccionarModoTercero() {
  //   this.tercerosForm.controls["tipo_persona"].clearValidators();
  //   this.tercerosForm.controls["direccion_residencia"].clearValidators();
  //   this.tercerosForm.controls["country_code"].clearValidators();
  //   this.tercerosForm.controls["state_code"].clearValidators();
  //   this.tercerosForm.controls["city_code"].clearValidators();
  //   this.tercerosForm.controls["responsabilidad_fiscal"].clearValidators();
  //   if(this.tercerosForm.value.tipo_tercero == 'C') {
  //     this.tercerosForm.controls["tipo_persona"].setValidators([Validators.required]);
  //     this.tercerosForm.controls["direccion_residencia"].setValidators([Validators.required]);
  //     this.tercerosForm.controls["country_code"].setValidators([Validators.required]);
  //     this.tercerosForm.controls["state_code"].setValidators([Validators.required]);
  //     this.tercerosForm.controls["city_code"].setValidators([Validators.required]);
  //     this.tercerosForm.controls["responsabilidad_fiscal"].setValidators([Validators.required]);
  //   }
  //   this.tercerosForm.controls["tipo_persona"].updateValueAndValidity();
  //   this.tercerosForm.controls["direccion_residencia"].updateValueAndValidity();
  //   this.tercerosForm.controls["country_code"].updateValueAndValidity();
  //   this.tercerosForm.controls["state_code"].updateValueAndValidity();
  //   this.tercerosForm.controls["city_code"].updateValueAndValidity();
  //   this.tercerosForm.controls["responsabilidad_fiscal"].updateValueAndValidity();
  // }

  getListaTipoDocumentos(){
    this.listasService.getListaTipoDocumento().subscribe(response => {
      this.lista_tipos_documentos = response.data.tipos_documentos.map(item => {
        return {
          id: item.id,
          name: item.nombre_tipo_documento
        };
      });
    });
  }
  getListaGeneros() {
    this.listasService.getListaGeneros().subscribe(response => {
      this.lista_generos = response.data.generos.map(item => {
        return {
          id: item.id,
          name: item.nombre_genero
        };
      });
    });
  }
  getListaPaises() {
    this.listasService.getListaPaises().subscribe(response => {
      this.lista_country = response.data.paises.map(item => {
        return {
          id: item.country_code,
          name: item.country_name
        };
      });
    });
  }
  getListaDepartamentos(clear_data = true) {
    if(clear_data) {
      this.tercerosForm.patchValue({
        state_code: null,
        city_code: null
      });
    }
    this.lista_state = [];
    this.lista_city = [];
    this.listasService.getListaDepartamentos({
      country_code: this.tercerosForm.value.country_code
    }).subscribe(response => {
      this.lista_state = response.data.departamentos.map(item => {
        return {
          id: item.state_code,
          name: item.state_name
        };
      });
    });
  }
  getListaCiudades(clear_data = true) {
    if(clear_data) {
      this.tercerosForm.patchValue({
        city_code: null
      });
    }
    this.lista_city = [];
    this.listasService.getListaCiudades({
      country_code: this.tercerosForm.value.country_code,
      state_code: this.tercerosForm.value.state_code
    }).subscribe(response => {
      this.lista_city = response.data.ciudades.map(item => {
        return {
          id: item.city_code,
          name: item.city_name
        };
      });
    });
  }
  public isRequiredField(field: string): boolean {
    const form_field = this.tercerosForm.get(field);
    if(!form_field.validator) return false;
    const validator = form_field.validator({} as AbstractControl);
    return validator ? (validator && validator.required) : false;
  }
  getTerceroById(){
    this.functions.loadingFloatingTools();
    this.tercerosService.getTerceroById(this.tercero_id).subscribe(response => {
      let data_tercero = response.data.tercero;
      let data_profile = response.data.role_tercero;
      let data_tercero_siigo = response.data.tercero_siigo;
      let profile = this.lista_tipos_terceros.filter(item => item.name == data_profile.nombre_perfil);
      this.tercerosForm.patchValue({
        id: data_tercero.id,
        tipo_documento_id: data_tercero.tipo_documento_id,
        numero_documento: data_tercero.numero_documento,
        nombres: data_tercero.nombres,
        apellidos: data_tercero.apellidos,
        correo_electronico: data_tercero.correo_electronico,
        genero: data_tercero.genero_id,
        numero_telefonico: data_tercero.numero_telefonico,
        numero_celular: data_tercero.numero_celular,
        // tipo_tercero: data_profile.nombre_perfil != null ? (data_profile.nombre_perfil.charAt(0) == 'S' ? 'A' : data_profile.nombre_perfil.charAt(0)) : 'C',
        //tipo_tercero: profile.length > 0 ? profile[0].id : 'C',
        //tipo_persona: data_tercero_siigo != null ? data_tercero_siigo.person_type : null,
        activo: data_profile.activo,
        //mayorista: data_tercero.mayorista,
        //responsable_iva: data_tercero_siigo != null ? data_tercero_siigo.vat_responsible : null,
        //responsabilidad_fiscal: data_tercero_siigo != null && data_tercero_siigo.fiscal_responsibilities != null ? data_tercero_siigo.fiscal_responsibilities[0].code : null,
        //direccion_residencia: data_tercero_siigo != null ? data_tercero_siigo.address.address : null,
        //country_code: data_tercero_siigo != null ? data_tercero_siigo.address.city.country_code : null,
        //state_code: data_tercero_siigo != null ? data_tercero_siigo.address.city.state_code : null,
        //city_code: data_tercero_siigo != null ? data_tercero_siigo.address.city.city_code : null
      });
      this.getListaDepartamentos(false);
      this.getListaCiudades(false);
      //this.seleccionarModoTercero();
      Swal.close();
    });
  }
  enviarTercero(){
    this.is_submit_form = true;
    if(this.tercerosForm.valid){
      if(this.tercerosForm.value.id == null && this.tercerosForm.value.tipo_tercero != 'C' && this.tercerosForm.value.password_usuario == null){
        this.toastr.error('Debe ingresar una contraseña', 'Error');
        return;
      }
      let request_form = null;
      this.is_loading = true;
      this.functions.loadingFloatingTools();
      let data_form: any = this.tercerosForm.value;
      if(this.tercerosForm.value.id != null){
        data_form.id = this.tercerosForm.value.id;
        request_form = this.tercerosService.putTercero(data_form.id, data_form);
      }else{
        request_form = this.tercerosService.postTercero(data_form);
      }
      request_form.subscribe(response => {
        Swal.close();
        this.toastr.success(response.message);
        this.notifierModalGeneral.notifySaveData.emit({
          from: 'terceros',
          data: response.data
        });
        this.modalClose();
      });
    }else{
      this.is_loading = false;
      this.toastr.error('Faltan campos por ingresar', 'Error');
    }
  }
}
