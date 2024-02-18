import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule }       from '@angular/common/http';

import { CamundaRestService }     from '../camunda-rest.service';
import { Task }                   from '../schemas/Task';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
  providers: [ CamundaRestService, HttpClientModule]
})
export class TasklistComponent implements OnInit {
  errorMessage : string | null
  tasks: Task[]   = new Array<Task>();
  public taskId: string  = '';
  public formKey: string = '';
  public taskType : string = '';

  constructor(
    private camundaRestService: CamundaRestService,
    private route: ActivatedRoute,
    private router: Router) {

      console.log('app-tasklist - route - ', route);

      this.router = router;
      this.errorMessage = null;

  }

  ngOnInit() {
    console.log('On init - tasklist');
    if (this.route.params != null) {
      this.route.params.subscribe(params => {

        if (params['taskType'] != null) {
          console.log('On init - tasklist - fetch tasks of type');
          this.taskType = params['taskType'];
          this.getTasksOfType( params['taskType'] );
        }
        // TODO - below snippet is not used. 
        else if (params['id'] != null) {
          this.taskId = params['id'];
          this.getFormKey();
        }
      });
    }
  }

  getFormKey(): void {
    this.camundaRestService
      .getTaskFormKey(this.taskId)
      .subscribe(formKey => this.formKey = formKey.key);
  }

  getTasks(): void {
    this.camundaRestService
      .getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  getTasksOfType(type: any): void {
    this.camundaRestService
      .getTasksOfType( this.getType(type) )
      .subscribe(tasks => {
        
          this.lookForError( tasks );    
          this.tasks = tasks 
      });
  }

  // read from environment configuration the actual bpmn task "id"
  // supports two task types as shown below
  getType(type : any) { 
    if (type === 'Registrar' )
              return environment.taskType_Registrar
    else if (type === 'Revisar' )
              return  environment.taskType_Revisar;
    else 
          return 'unknown';
  }

  // Handle any errors that may be present.
  lookForError( result : any ) : void {
    if ( result.error !== undefined && result.error !== null ){
      
      // error while loading tasklist. handle it by redirecting to error page
      this.errorMessage = result.message 
                            ? ( result.name + " " + result.message ) 
                            : result.error.message;
      console.log('routing to app error page ', this.errorMessage);
      this.router.navigate( 
                            [ 'error'  ], 
                            { queryParams: { message: this.errorMessage } }  
                          );
    }
  }

}
