import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SeleccionarTiendaFormComponent } from '../modal/form/seleccionar-tienda-form/seleccionar-tienda-form.component';

declare var $: any;

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {


  data_usuario: IUsuario;
  tienda: any = {} = {};

  private modalRef: NgbModalRef; 


  constructor(
    private router: Router,
    private modal: NgbModal,
    private authService: AuthService,
    private configModal: NgbModalConfig,
  ) { 
    this.configModal.backdrop = 'static';
    this.configModal.keyboard = false;
    this.data_usuario = this.authService.getDataLogin();
  }
  ngOnInit(): void {
    $("#sidebarToggle, #sidebarToggleTop").on("click", function(e){
			$("body").toggleClass("sidebar-toggled"),
			$(".sidebar").toggleClass("toggled"),
			$(".sidebar").hasClass("toggled") &&
			$(".sidebar .collapse").collapse("hide");
		});
		 setTimeout(() => {
		 	this.verificarIngresoTienda();
		 }, 1000);
  }
  verificarIngresoTienda(){
    let data_tienda = this.authService.getDataTienda();
    if(data_tienda == null){
      this.modalSeleccionarTienda(false);
    }else{
      this.tienda = data_tienda;
    }
  }
  modalSeleccionarTienda(tienda_seleccionada = true){
		this.modalRef = this.modal.open(SeleccionarTiendaFormComponent, { size: 'lg' });
		this.modalRef.componentInstance.tienda_seleccionada = tienda_seleccionada;
		this.modalRef.componentInstance.eventEmitter.subscribe(response => {
			this.verificarIngresoTienda();
		});
	}
  cerrarSesion(){
    this.authService.logout();
    this.router.navigate(['inicio-sesion']);
  }


}
