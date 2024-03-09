import { Injectable } from "@angular/core";
import { reservacion } from "../Models/reservacion";
import { DataServices } from "./data.services";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable()
export class ReservacionesService {
    reservaciones: reservacion[] = [];
    constructor(private dataService: DataServices, private router: Router) { }

    obtenerReservaciones() {
        return this.dataService.cargarReservaciones();
    }
    obtenerReservacionesPorFecha(fecha: string) {
        return this.dataService.cargarReservacionesPorFecha(fecha);
    }
    obtenerReservacionPorId(id: number) {
        return this.dataService.cargarReservacionPorId(id);
    }
    EliminarReservacion(id: number) {
        let idReservacion = this.reservaciones[id].id;
        if (idReservacion) {
            this.dataService.EliminarReservacion(idReservacion).subscribe(resultado => {
                if (resultado) {
                    Swal.fire(
                        'Reservacion',
                        'Eliminada correctamente',
                        'success'
                    ).then(() => {
                        this.reservaciones.splice(id, 1);
                    });
                } else {
                    Swal.fire(
                        'Error!',
                        'Ocurrio un error al intentar eliminar la reservacion',
                        'success'
                    )
                }
            });
        }
    }
    setReservaciones(misReservaciones: reservacion[]) {
        this.reservaciones = misReservaciones;
    }
    agregarReservacion(r: reservacion) {
        const listaReservaciones = this.reservaciones;
        this.reservaciones.push(r);
        this.dataService.guardarReservacion(r).subscribe(resultado => {
            if (resultado) {
                Swal.fire(
                    'Reservacion',
                    'guardada correctamente',
                    'success'
                )
            } else {
                this.reservaciones = listaReservaciones;
                Swal.fire(
                    'Error!',
                    'Ocurrio un error al intentar guardar la reservacion',
                    'success'
                )
            }
        });
    }
    actualizarReservacion(r: reservacion) {
        this.dataService.actualizarReservacion(r).subscribe(resultado => {
            if (resultado) {
                Swal.fire(
                    'Reservacion',
                    'actualizada correctamente',
                    'success'
                )
            } else {
                Swal.fire(
                    'Error!',
                    'Ocurrio un error al intentar actualizar la reservacion',
                    'success'
                )
            }
        });
    }
}