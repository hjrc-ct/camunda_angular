import { Component, OnInit } from '@angular/core';
import { CamundaRestService } from '../camunda-rest.service'
import { ProcessDefinition } from '../schemas/ProcessDefinition';
import { environment } from '../../environments/environment';

import { HttpClientModule }    from '@angular/common/http';

@Component({
  selector: 'app-processlist',
  templateUrl: './processlist.component.html',
  styleUrls: ['./processlist.component.css'],
  providers: [ CamundaRestService, HttpClientModule]
})
export class ProcesslistComponent implements OnInit {
  public processDefinitions: ProcessDefinition[] = new Array<ProcessDefinition>(); ;

  taskType_Registrar : string = 'Registrar'; // actual bpmn task id is given in environment file
  taskType_Revisar   : string = 'Revisar';   // actual bpmn task id is given in environment file

  constructor(private camundaRestService: CamundaRestService) { }

  ngOnInit() {
    console.log('Process List Component - on init');
    this.getProcessDefinitions();
  }

  getProcessDefinitions(): void {
    this.camundaRestService
      .getProcessDefinitions()
      .subscribe(processDefinitions => this.processDefinitions = processDefinitions);
  }

  getCamundaURL() : String { return this.camundaRestService.getURL(); }
  

}
