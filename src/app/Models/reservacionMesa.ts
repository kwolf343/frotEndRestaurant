import { mesa } from "./mesa";
import { reservacion } from "./reservacion";

export class reservacionMesa{
    reservacion:reservacion;
    mesa:mesa;
    constructor(reservacion:reservacion,mesa:mesa){
        this.reservacion=reservacion;
        this.mesa=mesa;
    }
}