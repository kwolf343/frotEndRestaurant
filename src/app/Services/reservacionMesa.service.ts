import { Injectable } from "@angular/core";
import { DataServices } from "./data.services";
import Swal from 'sweetalert2';
import { reservacionMesa } from "../Models/reservacionMesa";

@Injectable()
export class ReservacionMesaService{
    reservacionMesa:reservacionMesa[]=[];
    constructor(private dataService:DataServices){}

    agregarReservacionMesa(rM:reservacionMesa){
        const listaReservacionesMesas = this.reservacionMesa;
        this.reservacionMesa.push(rM);
        this.dataService.agregarMesaAReservacion(rM).subscribe(resultado=>{
            Swal.fire(
                'Mesa',
                'agregada correctamente',
                'success'
              ).then((result) => {
                
              })
        });
    }
}