import { Routes,RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import {HolaMundoComponent} from './hola-mundo/hola-mundo.component'
import { TareaUsuarioComponent } from './tarea-usuario/tarea-usuario.component';


export const routes: Routes = [

 { path: 'EventoInicio', component: HolaMundoComponent },
 { path:'RegistrarPedido',component:TareaUsuarioComponent}

];

@NgModule({

    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}
