import { Routes,RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import {startNewProcessComponent} from './forms/process_modelo/startNewProcess.component'
import { TareaUsuarioComponent } from './tarea-usuario/tarea-usuario.component';
import { RevisarSolicitudComponent } from './revisar-solicitud/revisar-solicitud.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CamundaRestService } from './camunda-rest.service';
import { MyAddonModule } from './forms/process_modelo/myAddon.module';
import { ProcesslistComponent } from './processlist/processlist.component';
import { HttpClientModule } from '@angular/common/http';


export const routes: Routes = [

 { path: 'EventoInicio/:processdefinitionkey', component: startNewProcessComponent }, // HolaMundoComponent
 { path: 'RegistrarSolicitud',component:TareaUsuarioComponent},
 { path: 'RevisarSolicitud',component:RevisarSolicitudComponent},
 { path: '', component:ProcesslistComponent },
];

@NgModule({

    imports:[
                RouterModule.forRoot(routes),
                BrowserModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                MyAddonModule
            ],
    providers: [CamundaRestService, HttpClientModule],
    exports:[RouterModule]
})
export class AppRoutingModule {}
