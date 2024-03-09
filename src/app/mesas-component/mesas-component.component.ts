import { Component, OnInit } from '@angular/core';
import { MesasService } from '../Services/mesas.service';
import { mesa } from '../Models/mesa';

@Component({
  selector: 'app-mesas-component',
  templateUrl: './mesas-component.component.html',
  styleUrls: ['./mesas-component.component.css']
})
export class MesasComponentComponent implements OnInit{
  mesas:mesa[]=[];
  seleccion:number;
  mensajeConexion='No se pudieron cargar los recursos, compruebe la conexion a la base de datos';
  img:string [] = ['assets/mesa2.png','assets/mesa5.png','assets/mesa6.png'];
  listaDeImagenes:string[]=[this.img[1],this.img[0],this.img[0],this.img[0],this.img[0],this.img[1],this.img[2],this.img[2],this.img[2],this.img[2],this.img[1],this.img[0],this.img[0],this.img[0],this.img[0],this.img[1]];
  constructor(private mesasService:MesasService){}
  ngOnInit(): void {
    this.mesasService.obtenerMesas().subscribe(misMesas=>{
        try{
          this.mesas=Object.values(misMesas);
          this.mesasService.setMesas(this.mesas);
          this.mensajeConexion='';
          this.ver(0);
          console.log(this.mesas);
        }catch{
          this.mesas = [];
        }
      });
  }

  ver(id:number){
    this.seleccion=id;
  }
  recibirNumero(id: number) {
    this.seleccion = id;
  }
}
