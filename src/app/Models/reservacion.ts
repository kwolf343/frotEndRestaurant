import { mesa } from "./mesa";

export class reservacion{
    id: number | null;
    persona:string;
    duiPersona:string;
    fechaReservacion:Date;
    fechaReserva:string;
    horaReserva:string;
    numPersonas:number;
    activa:boolean;
    mesas: mesa[] | null;
    constructor(id: number | null = null, persona: string, duiPersona: string, fechaReservacion: Date, fechaReserva: string, horaReserva: string, numPersonas: number, activa: boolean, mesas: mesa[] | null) {
        this.id = id;
        this.persona = persona;
        this.duiPersona = duiPersona;
        this.fechaReservacion = fechaReservacion;
        this.fechaReserva = fechaReserva;
        this.horaReserva = horaReserva;
        this.numPersonas = numPersonas;
        this.activa = activa;
        this.mesas = mesas;
    }
}