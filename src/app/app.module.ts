import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { SeleccionarTiendaFormComponent } from './components/modal/form/seleccionar-tienda-form/seleccionar-tienda-form.component';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { HttpClientModule } from '@angular/common/http';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TercerosComponent } from './pages/terceros/terceros.component';
import { TerceroFormComponent } from './components/modal/form/tercero-form/tercero-form.component';


const CustomSelectOptions: INgxSelectOptions = {
  optionValueField: 'id',
  optionTextField: 'name',
  keepSelectedItems: false
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuSidebarComponent,
    MenuTopComponent,
    SeleccionarTiendaFormComponent,
    InicioComponent,
    InicioSesionComponent,
    TercerosComponent,
    TerceroFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSelectModule.forRoot(CustomSelectOptions),
    SweetAlert2Module,
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
