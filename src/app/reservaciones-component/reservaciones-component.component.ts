import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservacionesService } from '../Services/reservaciones.service';
import { reservacion } from '../Models/reservacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservaciones-component',
  templateUrl: './reservaciones-component.component.html',
  styleUrls: ['./reservaciones-component.component.css']
})
export class ReservacionesComponentComponent implements OnInit{
  reservaciones:reservacion[]=[];
  constructor(private router:Router, private reservacionesService:ReservacionesService){}
  ngOnInit(): void {
    this.reservacionesService.obtenerReservaciones().subscribe(misReservaciones=>{
      try{
        this.reservaciones=Object.values(misReservaciones);
        this.reservacionesService.setReservaciones(this.reservaciones);
        console.log(this.reservaciones);
      }
      catch{
        this.reservaciones = [];
      }
    });
  }

  parseDate(fecha:string){
    return fecha.substring(0, 10);
  }

  nuevaReservacion(){
    this.router.navigate(['/reservacion']);
  }
  inspeccionarReservacion(id:number){
    this.router.navigate(['/inspeccionar/'+id]);
  }
  modificarReservacion(id:number){
    this.router.navigate(['/reservacion/'+id]);
  }
  eliminarReservacion(id:number){
    Swal.fire({
      title: '¿Deseas borrar la reservacion?',
      text: "Esta accion no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
         this.reservacionesService.EliminarReservacion(id);
      }
    })
  }
}
