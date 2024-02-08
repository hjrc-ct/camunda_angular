import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { CamundaRestService } from './camunda-rest.service';
import { ProcesslistComponent } from './processlist/processlist.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { MyAddonModule } from './forms/process_modelo/myAddon.module';

@NgModule({
    declarations: [
      ProcesslistComponent,
      StartProcessComponent,
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
