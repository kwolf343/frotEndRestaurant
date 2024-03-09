import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { mesa } from "../Models/mesa";
import { Observable, catchError, tap, throwError } from "rxjs";
import { reservacion } from "../Models/reservacion";
import { reservacionMesa } from "../Models/reservacionMesa";
import { environment } from "../environment";

@Injectable()
export class DataServices{
    constructor(private HttpClient:HttpClient){}
    cargarMesas(){
        return this.HttpClient.get(environment.urlBackend+'mesas');
    }
    guardarMesa(mesa: mesa): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this.HttpClient.post(environment.urlBackend+'mesas', mesa).subscribe({
                next: (response) => {
                    console.log('Se ha guardado la mesa ' + response);
                    observer.next(true);
                    observer.complete();
                },
                error: (error) => {
                    console.log('Error' + error);
                    observer.next(false);
                    observer.complete();
                },
            });
        });
    }

    cargarReservaciones(){
        return this.HttpClient.get(environment.urlBackend+'reservacion');
    }
    cargarReservacionesPorFecha(fecha:string){
        return this.HttpClient.get(environment.urlBackend+'reservacion/query?fechaReserva='+fecha);
    }
    cargarReservacionPorId(id:number){
        return this.HttpClient.get(environment.urlBackend+'reservacion/'+id);
    }
    EliminarReservacion(id:number){
        return this.HttpClient.delete(environment.urlBackend+'reservacion/'+id)
            .pipe(
                tap(() => {
                    console.log('La reservación fue eliminada exitosamente');
                }),
                catchError(error => {
                    console.log('Error al eliminar la reservación: ', error);
                    return throwError(error);
                })
            );
    }

    guardarReservacion(reservacion: reservacion): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this.HttpClient.post(environment.urlBackend+'reservacion', reservacion).subscribe({
                next: (response) => {
                    console.log(response);
                    console.log('Se ha guardado la reservacion ' + response);
                    observer.next(true);
                    observer.complete();
                },
                error: (error) => {
                    console.log('Error' + error);
                    observer.next(false);
                    observer.complete();
                },
            });
        });
    }
    actualizarReservacion(reservacion: reservacion): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this.HttpClient.put(environment.urlBackend+'reservacion/'+reservacion.id, reservacion).subscribe({
                next: (response) => {
                    console.log(response);
                    console.log('Se ha actualizado la reservacion ' + response);
                    observer.next(true);
                    observer.complete();
                },
                error: (error) => {
                    console.log('Error' + error);
                    observer.next(false);
                    observer.complete();
                },
            });
        });
    }
    agregarMesaAReservacion(reservacionesMesa: reservacionMesa): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this.HttpClient.post(environment.urlBackend+'reservacionMesa', reservacionesMesa).subscribe({
                next: (response) => {
                    console.log('Se agregó la mesa exitosamente ' + response);
                    observer.next(true);
                    observer.complete();
                },
                error: (error) => {
                    console.log('Error' + error);
                    observer.next(false);
                    observer.complete();
                },
            });
        });
    }
}