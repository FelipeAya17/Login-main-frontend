import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { EventLoadingService } from './event-loading.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from  'rxjs/operators'
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interfaces/i-usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private toastrService: ToastrService,
    private eventLoadingService: EventLoadingService
  ) { }
  public login (email: string, password: string):Observable<any>{
    return this.http.post<any>(`${environment.URL_API}ingreso`, {
      email: email, 
      password: password
    }).pipe(
      catchError((e: any) => {
        if(e.status == 400){
          return throwError(e)
        }
        this.toastrService.error(e.error.message, 'Error');
        this.eventLoadingService.notifyOnStoped.emit();
        return throwError(e);
      })
    );
  }

  public logout(){
    localStorage.removeItem(environment.TOKEN_NAME);
    localStorage.removeItem('DATA_USER_COT');
    localStorage.removeItem('DATA_TIENDA_INGRESO');
  }
  public getDataLogin(): any {
    const data_usuario: IUsuario = JSON.parse(localStorage.getItem('DATA_USER_COT'));
    return data_usuario;
  }
   public getDataTienda(): any {
    let dataLocalStorage = localStorage.getItem('DATA_TIENDA_INGRESO');
   if(dataLocalStorage == null){
    return null;
     }
     return JSON.parse(dataLocalStorage);
   }
  public isAthenticated(): boolean {
    const token = localStorage.getItem(environment.TOKEN_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }
}
