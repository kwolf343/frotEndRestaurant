import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent {
  mostrar=true;
  pad=false;
  constructor(){}
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = window.innerWidth;
    if (screenWidth > 550) {
      this.mostrar=true;
      //this.pad=false;
    }
  }
  cerrar(){
    this.mostrar=true;
    //this.pad=false;
  }
  abrir(){
    this.mostrar=false;
    //this.pad=true;
  }

}
