import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild,
  ViewContainerRef, ComponentFactoryResolver  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CamundaRestService } from '../camunda-rest.service';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.css'],
  providers: [CamundaRestService]
})
export class StartProcessComponent implements OnInit {
  private processDefinitionKey: String = '';
  private formKey: String = '';
  private rootViewContainer = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private camundaRestService: CamundaRestService
              ) { }

  ngOnInit() {
    if (this.route.params != null) {
      this.route.params.subscribe(params => {
        this.processDefinitionKey = params['processdefinitionkey'];
        console.log('Loading process def ', this.processDefinitionKey);
        this.loadTaskKey();
      });
    }
  }

  loadTaskKey(): void {
    this.camundaRestService.getProcessDefinitionTaskKey(this.processDefinitionKey)
      .subscribe(formKey => {
        this.formKey = formKey.key
      });
  }

  getKey(): String { return  this.processDefinitionKey; }
}
