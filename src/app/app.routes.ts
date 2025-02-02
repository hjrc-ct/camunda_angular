import { Routes,RouterModule}               from '@angular/router';
import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }                 from '@angular/common/http';

import { CamundaRestService }               from './camunda-rest.service';
import { MyAddonModule }                    from './forms/process_modelo/myAddon.module';
import { ProcesslistComponent }             from './processlist/processlist.component';
import { TasklistComponent }                from './tasklist/tasklist.component';

import { startNewProcessComponent }         from './forms/process_modelo/startNewProcess.component'
import { registrarDataTaskComponent }       from './forms/process_modelo/registrarDataTask.component'
import { revisarDataTaskComponent }         from './forms/process_modelo/revisarDataTask.component';


import { errorComponent }                   from './forms/general/error.component';
import { Page404Component } from './page404/page404.component';



export const routes: Routes = [

 { path: 'EventoInicio/:processdefinitionkey',  component: startNewProcessComponent  }, 
 { path: '',                                    component:ProcesslistComponent       },
 { path: 'tasklist/:taskType',                  component:TasklistComponent          },
 { path: 'tasklist/Registrar/:id',              component:registrarDataTaskComponent },
 { path: 'tasklist/Revisar/:id',                component:revisarDataTaskComponent   },
 { path: 'error',                               component: errorComponent            },
 { path: "**",                                  component: Page404Component          }
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
