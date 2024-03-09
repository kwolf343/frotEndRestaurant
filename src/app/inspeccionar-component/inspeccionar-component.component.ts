import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservacionesService } from '../Services/reservaciones.service';
import { reservacion } from '../Models/reservacion';

@Component({
  selector: 'app-inspeccionar-component',
  templateUrl: './inspeccionar-component.component.html',
  styleUrls: ['./inspeccionar-component.component.css']
})
export class InspeccionarComponentComponent implements OnInit{
  indice:number;
  reservacionSelec:reservacion;
  reservaciones:reservacion[]=[];
  posListClientesRevez:number[]=[];
  constructor(private route:ActivatedRoute, private router:Router,private reservacionService:ReservacionesService){}
  ngOnInit(): void {
    this.indice = this.route.snapshot.params['id'];
    if (this.indice !== null && !isNaN(Number(this.indice))) {
      if(this.indice>=0){
        this.reservacionService.obtenerReservaciones().subscribe(misReservaciones=>{
          try{
            this.reservaciones=Object.values(misReservaciones);
            this.reservacionSelec=this.reservaciones[this.indice];
            }catch{
              this.router.navigate(['/reservaciones']);
            }
        });
      }
      else{
        this.router.navigate(['/reservaciones']);
      }
    }else{
      this.router.navigate(['/reservaciones']);
    }
  }
  regresar(){
    this.router.navigate(['/reservaciones']);
  }
  parseDate(fecha: Date) {
    let f = fecha.toString();
    return f.substring(0, 10);
  }
}
