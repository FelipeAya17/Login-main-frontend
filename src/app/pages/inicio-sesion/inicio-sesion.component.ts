import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EventLoadingService } from 'src/app/services/event-loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit, OnDestroy {

  loginForm;
  is_formulario: boolean = false;
  logo: string = `${environment.URL_SERVE}assets/image/logo.jpeg`;
  _loading: string = `${environment.URL_SERVE}assets/image/loading.gif`;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private eventLoadingService: EventLoadingService
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    document.body.className = 'bg-gradient-dark';
    this.eventLoadingService.notifyOnStoped.subscribe(item => {
      this.is_formulario = false;
    });
  }
  ngOnDestroy() {
    document.body.className = '';
  }
  ingresoAplicacion(){
    if(this.loginForm.valid){
      this.is_formulario = true;
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(response => {
        localStorage.setItem(environment.TOKEN_NAME, response.data.token);
        localStorage.setItem('DATA_USER_COT', JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
        }));
        this.router.navigate(['/']);
      });
    }else{
      this.toastr.error('Debe ingresar todos los campos', 'Error');
    }
  }

}
