import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TerceroFormComponent } from 'src/app/components/modal/form/tercero-form/tercero-form.component';
import { ITercero } from 'src/app/interfaces/i-tercero';
import { NotifierModalGeneralService } from 'src/app/services/notifier-modal-general.service';
import { TercerosService } from 'src/app/services/terceros.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html'
})
export class TercerosComponent implements OnInit {

  private modalRef: NgbModalRef;

  current_page: number = 1;
  last_page: number;

  query_params: any = null;
  lista_terceros: ITercero[] = [];

  on_loading: boolean;
  _loading: string = `${environment.URL_SERVE}assets/image/loading.gif`;

  constructor(
    private modal: NgbModal,
    private configModal: NgbModalConfig,
    private tercerosService: TercerosService,
    private notifierModalGeneralService: NotifierModalGeneralService
  ) {
    this.configModal.backdrop = 'static';
    this.configModal.keyboard = false;
   }
  ngOnInit(): void {
    this.getListaTerceros();
    this.notifierModalGeneralService.notifySaveData.subscribe(response => {
      this.getListaTerceros();
    });
  }
  getListaTerceros(query_params = null, next_page = 1){
    this.on_loading = true;
    this.tercerosService.getListaTerceros(query_params, next_page).subscribe(response => {
      this.lista_terceros = response.data.terceros.data;
      this.current_page = response.data.terceros.current_page;
      this.last_page = response.data.terceros.last_page;
      this.on_loading = false;
    });
  }
  modalFormTerceros(tercero_id = null){
    this.modalRef = this.modal.open(TerceroFormComponent, { size: 'lg' });
    this.modalRef.componentInstance.tercero_id = tercero_id;
  }
}
