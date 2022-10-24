import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  url_default: string = 'maestros/tiendas'

  constructor(private http: HttpClient) { }
  getListasTiendas():Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}/lista`);
  }
  // getListaTiendasUsuarios(usuario_id): Observable <any>{
  //   return this.http.get<any>(`${environment.URL_API}${this.url_default}/${usuario_id}/usuario`);
  // }
}
