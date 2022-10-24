import { Component, Host, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { timeOutSession } from './utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  timeOutInactive;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService
  ){}
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationEnd){
        this.modalService.dismissAll();
      }
    });
    if(this.authService.isAthenticated()) {
      this.chekTimeOut();
    }
  }
  chekTimeOut(){
    this.timeOutInactive = setTimeout(() => {
      alert("Sesión finalizada por inactividad");
      this.authService.logout();
      location.reload();
    }, timeOutSession);
  }
  @HostListener('window:keydown')
  @HostListener('window:mousedown')
  checkResetSesion(){
    if(this.authService.isAthenticated()){
      clearTimeout(this.timeOutInactive);
      this.chekTimeOut();
    }
  }
}
