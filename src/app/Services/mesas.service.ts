import { Injectable } from "@angular/core";
import { mesa } from "../Models/mesa";
import { DataServices } from "./data.services";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable()
export class MesasService{
    mesas:mesa[]=[];
    constructor(private dataService:DataServices, private router:Router){}
    
    obtenerMesas(){
        return this.dataService.cargarMesas();
    }
    setMesas(misMesas:mesa[]){
        this.mesas=misMesas;
    }

    agregarMesa(m:mesa){
        const listaMesas = this.mesas;
        this.mesas.push(m);
        this.dataService.guardarMesa(m).subscribe(resultado=>{
            if(resultado){
                Swal.fire(
                    'Mesa',
                    'guardada correctamente',
                    'success'
                  ).then((result) => {
                    //this.router.navigate(['/mesas']);
                  })
            }else{
                this.mesas = listaMesas;
                  Swal.fire(
                    'Error!',
                    'Ocurrio un error al intentar guardar la mesa',
                    'success'
                  )
            }
        });
    }
}
