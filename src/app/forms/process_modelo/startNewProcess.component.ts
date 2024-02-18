import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaRestService } from '../../camunda-rest.service';
import { StartProcessInstanceComponent } from '../general/start-process-instance.component'
import { MyProcessData } from '../../schemas/MyProcessData';
import { NgForm } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

@Component({
  selector: 'startNewProcess',
  templateUrl: './startNewProcess.component.html',
  styleUrls: [ './startNewProcess.component.css'],
  providers: [ CamundaRestService, HttpClientModule],
  exportAs: 'startNewProcess'
})
export class startNewProcessComponent 
             extends StartProcessInstanceComponent 
             //implements OnInit
             {
  NgForm = NgForm;
  public titulo="Ingreso de datos"; 
  override  submitted:boolean = false;
  override  model = new MyProcessData('','','');
    
  constructor(
    camundaRestService: CamundaRestService, 
    route: ActivatedRoute,
    router : Router) {
    super(camundaRestService, route, router);
  }

}
