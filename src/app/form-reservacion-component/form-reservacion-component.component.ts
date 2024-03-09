import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservacionesService } from '../Services/reservaciones.service';
import { reservacion } from '../Models/reservacion';
import Swal from 'sweetalert2';
import { mesa } from '../Models/mesa';
import { MesasService } from '../Services/mesas.service';
import { ReservacionMesaService } from '../Services/reservacionMesa.service';

@Component({
  selector: 'app-form-reservacion-component',
  templateUrl: './form-reservacion-component.component.html',
  styleUrls: ['./form-reservacion-component.component.css']
})
export class FormReservacionComponentComponent implements OnInit {
  indice: number;
  mesas: mesa[] = [];
  actualizar: boolean = false;
  titulo: string = 'Nueva reservacion';
  persona: string = '';
  duiPersona: string = '';
  fechaReservacion: Date = new Date();
  fechaReserva: string = '';
  horaSeleccionada: string = '5:00 PM';
  horasDisponibles: string[] = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];
  errorPersona: string = '';
  errorDui: string = '';
  errorFecha: string = '';
  errorHora: string = '';
  errorNum: string = '';
  numPersonas: number = 0;
  activa: boolean = false;
  reservaciones: reservacion[] = [];
  reservacion: reservacion;
  ////////////////////////////////////////////////////////////////////////////////////////
  zonaReservacion = true;
  ////////////////////////////////////////////////////////////////////////////////////////
  mesasReservadas: mesa[] = [];
  mireservacion: reservacion;
  //seleccion:number;
  constructor(private route: ActivatedRoute, private router: Router, private reservacionesService: ReservacionesService, private mesasService: MesasService, private reservacionMesaService: ReservacionMesaService) { }
  ngOnInit(): void {
    this.indice = this.route.snapshot.params['id'];
    if (this.indice !== null && !isNaN(Number(this.indice))) {
      if (this.indice >= 0) {
        this.titulo = 'Actualizar reservacion';
        this.actualizar = true;
      }
      else {
        this.router.navigate(['/reservaciones']);
      }
    }
    this.reservacionesService.obtenerReservaciones().subscribe(misReservaciones => {
      try {
        this.reservaciones = Object.values(misReservaciones);
        this.reservacionesService.setReservaciones(this.reservaciones);
        if (this.actualizar) {
          try {
            this.reservacion = this.reservaciones[this.indice];
            this.persona = this.reservacion.persona;
            this.duiPersona = this.reservacion.duiPersona;
            this.fechaReserva = this.reservacion.fechaReserva;
            this.horaSeleccionada = this.reservacion.horaReserva;
            this.numPersonas = this.reservacion.numPersonas;
          } catch {
            console.log('El cliente no existe en la lista');
            this.router.navigate(['/reservaciones']);
          }
        }
      }
      catch {
        this.reservaciones = [];
      }
    });
    this.mesasService.obtenerMesas().subscribe(misMesas => {
      try {
        this.mesas = Object.values(misMesas);
        this.mesasService.setMesas(this.mesas);
      } catch {
        this.mesas = [];
      }
    });
  }

  guardar(form: NgForm) {
    if (this.zonaReservacion) {
      if (this.validar()) {
        if (!this.actualizar) {
          this.mireservacion = new reservacion(null, this.persona, this.duiPersona, this.fechaReservacion, this.fechaReserva, this.horaSeleccionada, this.numPersonas, true, null);
          Swal.fire({
            title: '¿Desea agregar mesas a su reservación?',
            text: "si desea, podrá agregarlas luego",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, agregar!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.titulo = 'Selecciona las mesas';
              this.zonaReservacion = false;
              //cargamos las reservaciones por fecha seleccionada
              this.reservacionesService.obtenerReservacionesPorFecha(this.fechaReserva).subscribe(misReservaciones => {
                try {
                  this.reservaciones = Object.values(misReservaciones);
                  for (let i = 0; i < this.reservaciones.length; i++) {
                    const reservacion = this.reservaciones[i];
                    if (reservacion && reservacion.mesas) {
                      for (let j = 0; j < reservacion.mesas.length; j++) {
                        this.mesasReservadas.push(reservacion.mesas[j]);
                      }
                    }
                  }
                } catch {
                  this.reservaciones = [];
                }
              });
            } else {
              this.reservacionesService.agregarReservacion(this.mireservacion);
              this.router.navigate(['/reservaciones']);
            }
          })
        } else {
          this.mireservacion = new reservacion(this.reservacion.id, this.persona, this.duiPersona, this.fechaReservacion, this.fechaReserva, this.horaSeleccionada, this.numPersonas, true, null);
          this.zonaReservacion = false;
          this.mireservacion.mesas = this.reservacion.mesas;
          this.reservacionesService.obtenerReservacionesPorFecha(this.fechaReserva).subscribe(misReservaciones => {
            try {
              this.reservaciones = Object.values(misReservaciones);
              for (let i = 0; i < this.reservaciones.length; i++) {
                const reservacion = this.reservaciones[i];
                if(reservacion.id != this.reservacion.id){
                  if (reservacion && reservacion.mesas) {
                    for (let j = 0; j < reservacion.mesas.length; j++) {
                      this.mesasReservadas.push(reservacion.mesas[j]);
                    }
                  }
                }
              }
            } catch {
              this.reservaciones = [];
            }
          });
        }
      }
    } else {
      if (!this.actualizar) {
        //Guarda
        this.reservacionesService.agregarReservacion(this.mireservacion);
      } else {
        //Actualiza
        this.reservacionesService.actualizarReservacion(this.mireservacion);
      }
      this.router.navigate(['/reservaciones']);
    }
  }

  cancelar() {
    this.router.navigate(['/reservaciones']);
  }
  recibirNumero(id: number) {
    let reservada = false;
    let seleccionada = false;
    for (let i = 0; i < this.mesasReservadas.length; i++) {
      if (this.mesasReservadas[i].id == this.mesas[id].id) {
        reservada = true;
      }
    }
    if (this.mireservacion.mesas != null) {
      for (let i = 0; i < this.mireservacion.mesas.length; i++) {
        if (this.mireservacion.mesas[i].id == this.mesas[id].id) {
          seleccionada = true;
        }
      }
    }

    if (reservada) {
      Swal.fire(
        'No se puede reservar',
        'La mesa ya a sido reservada anteriormente',
        'error'
      ).then((result) => { })
    } else if (seleccionada) {
      Swal.fire(
        'No se puede reservar',
        'No se puede reservar la misma mesa mas de una vez',
        'error'
      ).then((result) => { })
    }
    else {
      if (!this.mireservacion.mesas) this.mireservacion.mesas = [];
      this.mireservacion.mesas.push(new mesa((id + 1), 0));
    }
  }
  validar(): boolean {
    //Validar nombre
    if (this.textoVacio(this.persona)) {
      this.errorPersona = 'No puede quedar vacío!';
      return false;
    }
    else if (this.validarTexto(this.persona)) {
      this.errorPersona = 'Caracteres invalidos!';
      return false;
    }
    //validar dui
    else this.errorPersona = '';
    if (this.textoVacio(this.duiPersona)) {
      this.errorDui = 'No puede quedar vacío!';
      return false;
    } else if (!this.validarDui(this.duiPersona)) {
      this.errorDui = 'El formato de dui no es valido!';
      return false;
    } else {
      this.errorDui = '';
    }
    //validar hora
    if (this.textoVacio(this.horaSeleccionada)) {
      this.errorHora = 'No puede quedar vacío!';
      return false;
    } else if (!this.validarFormatoHora(this.horaSeleccionada)) {
      this.errorHora = 'El formato de hora no es valido!';
      return false;
    } else {
      this.errorHora = '';
    }
    // Validar Fecha de Reserva
    if (this.textoVacio(this.fechaReserva)) {
      this.errorFecha = 'No puede quedar vacío!';
      return false;
    } else {
      const fechaReserva = new Date(this.fechaReserva);
      const fechaActual = new Date();

      if (fechaReserva < fechaActual) {
        this.errorFecha = 'La fecha de reserva no puede ser anterior a la fecha actual';
        return false;
      } else {
        this.errorFecha = '';
      }
    }
    //validar numero
    if (this.textoVacio(this.numPersonas.toString())) {
      this.errorNum = 'No puede quedar vacío!';
      return false;
    } else if (!Number.isInteger(this.numPersonas) || this.numPersonas < 1) {
      this.errorNum = 'cantidad de personas no aceptada';
      return false;
    } else if (!this.maximasPersonas(this.numPersonas)) {
      this.errorNum = 'No hay suficientes mesas para cubir esta cantidad de personas';
      return false;
    } else {
      this.errorNum = '';
    }
    return true;
  }
  textoVacio(cadena: string | undefined | null): boolean {
    if (cadena && cadena.trim().length > 0) return false;
    return true;
  }
  validarTexto(nombre: string): boolean {
    const patron = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/;
    return !patron.test(nombre);
  }
  validarDui(dui: string): boolean {
    const duiRegex = /^\d{8}-\d$/;
    return duiRegex.test(dui);
  }
  validarFormatoHora(hora: string): boolean {
    const horaRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] PM$/;
    return horaRegex.test(hora);
  }
  maximasPersonas(cantidadPersonas: number): boolean {
    //54
    let maxPersonas = 54;
    let contador = 0;
    let reservaionesSeleccionadas = [];
    //Seleccionamos todas las reservaciones con la fecha que deseamos ingresar
    for (let i = 0; i < this.reservaciones.length; i++) {
      if (this.reservaciones[i].fechaReserva == this.fechaReserva) {
        reservaionesSeleccionadas.push(this.reservaciones[i]);
      }
    }
    for (let i = 0; i < reservaionesSeleccionadas.length; i++) {
      let resTemp = reservaionesSeleccionadas[i];
      if (resTemp.mesas) {
        for (let j = 0; j < resTemp.mesas.length; j++) {
          let mesa = resTemp.mesas[j];
          contador += mesa.capacidad;
        }
      }
    }
    let cantidadisponible = maxPersonas - contador;
    if (cantidadPersonas <= cantidadisponible) {
      return true;
    } else {
      return false;
    }
  }
  quitar(num: number) {
    if (this.mireservacion.mesas != null) {
      this.mireservacion.mesas.splice(num, 1);
    }
  }
}
