import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITiendaSeleccionada } from '../interfaces/i-tienda-seleccionada';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TercerosService {

  url_default: string = 'terceros'
  tienda_seleccionada: ITiendaSeleccionada;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.tienda_seleccionada = this.authService.getDataTienda();
   }
   getListaTerceros(query_params = null, page = 1): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}?page=${page}${query_params != null && query_params != '' ? `&query=${query_params}` : ''}`);
  }
  getTerceroById(tercero_id): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}/${tercero_id}`);
  }
  postTercero(data_form): Observable <any> {
    data_form.codigo_tienda = this.tienda_seleccionada.id;
    return this.http.post<any>(`${environment.URL_API}${this.url_default}/crear`, data_form);
  }
  putTercero(id, data_form): Observable <any> {
    return this.http.put<any>(`${environment.URL_API}${this.url_default}/${id}/editar`, data_form);
  }
  getListaDireccionesTercero(id): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}/${id}/direcciones`);
  }
  postDireccionTercero(id, data_form): Observable <any> {
    return this.http.post<any>(`${environment.URL_API}${this.url_default}/${id}/direcciones`, data_form);
  }
}
