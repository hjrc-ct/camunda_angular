import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { HttpClientModule }         from '@angular/common/http';

import { AppRoutingModule }         from './app.routes';
import { CamundaRestService }       from './camunda-rest.service';
import { ProcesslistComponent }     from './processlist/processlist.component';
import { StartProcessComponent }    from './start-process/start-process.component';
import { registrarDataTaskComponent}from './forms/process_modelo/registrarDataTask.component'
import { revisarDataTaskComponent}  from './forms/process_modelo/revisarDataTask.component';
import { MyAddonModule }            from './forms/process_modelo/myAddon.module';
import { TasklistComponent }        from './tasklist/tasklist.component';
import { DateAgoPipe }              from './util/date-ago.pipe'
import { errorComponent } from './forms/general/error.component';

@NgModule({
    declarations: [
      ProcesslistComponent,
      StartProcessComponent,
      registrarDataTaskComponent,
      revisarDataTaskComponent,
      TasklistComponent,
      errorComponent,
      DateAgoPipe
    ],
    imports: [
      FormsModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      MyAddonModule
    ],
    providers: [HttpClientModule, CamundaRestService],
    bootstrap: []
  })

export class AppModule { }
