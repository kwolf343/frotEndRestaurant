import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';

import { RouterModule, Routes } from '@angular/router';
import { MesasComponentComponent } from './mesas-component/mesas-component.component';
import { ErrorPersonalizadoComponentComponent } from './error-personalizado-component/error-personalizado-component.component';
import { InicioComponentComponent } from './inicio-component/inicio-component.component';
import { ReservacionesComponentComponent } from './reservaciones-component/reservaciones-component.component';
import { DataServices } from './Services/data.services';
import { MesasService } from './Services/mesas.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReservacionesService } from './Services/reservaciones.service';
import { FormReservacionComponentComponent } from './form-reservacion-component/form-reservacion-component.component';
import { InteriorMesasComponentComponent } from './interior-mesas-component/interior-mesas-component.component';
import { ReservacionMesaService } from './Services/reservacionMesa.service';
import { InspeccionarComponentComponent } from './inspeccionar-component/inspeccionar-component.component';

const appRoutes:Routes=[
  {path:'', component:InicioComponentComponent},
  {path:'mesas', component:MesasComponentComponent},
  {path:'reservaciones', component:ReservacionesComponentComponent},
  {path:'reservacion', component:FormReservacionComponentComponent},
  {path:'reservacion/:id', component:FormReservacionComponentComponent},
  {path:'inspeccionar/:id', component:InspeccionarComponentComponent},
  {path:'**', component:ErrorPersonalizadoComponentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponentComponent,
    MesasComponentComponent,
    InicioComponentComponent,
    ReservacionesComponentComponent,
    FormReservacionComponentComponent,
    InteriorMesasComponentComponent,
    InspeccionarComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [DataServices,MesasService,ReservacionesService,ReservacionMesaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
