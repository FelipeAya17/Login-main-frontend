import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  url_default: string = 'maestros/tiendas/lista/'

  constructor(private http: HttpClient, private toastr: ToastrService) {}
  getListaTipoDocumento(): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}tipo-documento`);
  }
  getListaTiposPagos(): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}tipo-pago`);
  }
  getListaFormasPagos(): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}formas-pago`);
  }
  getListaProveedores(): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}proveedores`);
  }
  getListaFuncionesProductos(): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}funciones-productos`);
  }
  getListaGrupos(): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}grupos`);
  }
  getListaLineas(grupo_id): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}grupos/${grupo_id}/lineas`);
  }
  getListaPaises(): Observable <any> {
    return this.http.post<any>(`${environment.URL_API}${this.url_default}paises`, {});
  }
  getListaDepartamentos(data_form): Observable <any> {
    return this.http.post<any>(`${environment.URL_API}${this.url_default}departamentos`, data_form);
  }
  getListaCiudades(data_form): Observable <any> {
    return this.http.post<any>(`${environment.URL_API}${this.url_default}ciudades`, data_form);
  }
  getListaTiposVentas(): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}tipos-ventas`);
  }
  getListaGeneros(): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}genero`);
  }
  getListaTiposEnvio(): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}tipos-envio`);
  }
  getListaGruposRutas(): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}grupos-rutas`);
  }
}
