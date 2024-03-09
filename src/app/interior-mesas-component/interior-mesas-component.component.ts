import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MesasService } from '../Services/mesas.service';
import { mesa } from '../Models/mesa';

@Component({
  selector: 'app-interior-mesas-component',
  templateUrl: './interior-mesas-component.component.html',
  styleUrls: ['./interior-mesas-component.component.css']
})
export class InteriorMesasComponentComponent{
  @Output() numeroEnviado = new EventEmitter<number>();
  seleccion=0;
  mensajeConexion='No se pudieron cargar los recursos, compruebe la conexion a la base de datos';
  img:string [] = ['assets/mesa2.png','assets/mesa5.png','assets/mesa6.png'];
  listaDeImagenes:string[]=[this.img[1],this.img[0],this.img[0],this.img[0],this.img[0],this.img[1],this.img[2],this.img[2],this.img[2],this.img[2],this.img[1],this.img[0],this.img[0],this.img[0],this.img[0],this.img[1]];
  ver(id:number){
    this.numeroEnviado.emit(id);
  }
}
