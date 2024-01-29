import { Routes,RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import {HolaMundoComponent} from './hola-mundo/hola-mundo.component'
import { TareaUsuarioComponent } from './tarea-usuario/tarea-usuario.component';
import { RevisarSolicitudComponent } from './revisar-solicitud/revisar-solicitud.component';


export const routes: Routes = [

 { path: 'EventoInicio', component: HolaMundoComponent },
 { path:'RegistrarSolicitud',component:TareaUsuarioComponent},
 { path:'RevisarSolicitud',component:RevisarSolicitudComponent},

];

@NgModule({

    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}
