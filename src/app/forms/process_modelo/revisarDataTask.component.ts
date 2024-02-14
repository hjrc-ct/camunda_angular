import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaRestService } from '../../camunda-rest.service';
import { CompleteTaskComponent } from '../general/complete-task.component';
import { RevisarData } from '../../schemas/RevisarData';
import { HttpClientModule, HttpEvent, HttpHandler, HttpRequest }    from '@angular/common/http';
import { MyProcessData } from '../../schemas/MyProcessData';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { RegistrarData } from '../../schemas/RegistrarData';


@Component({
  selector: 'revisarDataTask',
  templateUrl: './revisarDataTask.component.html',
  styleUrls: [ './revisarDataTask.component.css' ],
  providers: [ CamundaRestService, HttpClientModule, FormsModule],
  exportAs: 'revisarDataTask'
})
export class revisarDataTaskComponent extends CompleteTaskComponent {
  NgForm = NgForm;

  override model     : RevisarData = new RevisarData('no', 'optional');

  public titulo : string = 'Formulario De Revision';

  // Base model refers to the input at the beginning of BPMN
  // that is, Start Event
  public modelBase : MyProcessData;

  // Registrar model refers to the input captured in an earlier task
  // that is, prior to the current Review task
  public modelRegistrarData : RegistrarData;  

  // task id and date are handled via tasklist page. 
  public taskId : string = '';
  public date : any; // task date handled as query param

  constructor(route: ActivatedRoute,
    router: Router,
    camundaRestService: CamundaRestService) {
    super(route, router, camundaRestService);

    this.modelBase          = new MyProcessData();
    this.modelRegistrarData = new RegistrarData();

    this.route.queryParamMap.subscribe ( qParams => { 
      if (  null !== qParams?.get('date') ) {
            this.date = qParams.get('date');
      } else {
            this.date = '';
      }
    }
    )

    this.route.params.subscribe(params => {
      const variableNames = Object.keys(this.model).join(','); 
      // task id is from the route params
      this.taskId = params['id'];

      // ready to do the processing now
      this.loadExistingVariables(this.taskId , variableNames);
    });
  }

  override loadExistingVariables(taskId: String, variableNames: String) {
    console.log('load existing variables ...', taskId)

    this.camundaRestService.getVariablesForTask(taskId, variableNames)
        .subscribe((result) => {
            this.lookForError( result );          
            
            this.generateModelFromVariables(result);
        });
  }

  override   generateModelFromVariables(variables: { [x: string]: { value: any; }; }) {
    Object.keys(variables).forEach((variableName) => {

      switch(variableName){
        case 'tipo_cumplimiento':
            console.log('set tipo_cumplimiento = ', variables[variableName].value);
            this.modelBase.tipo_cumplimiento = variables[variableName].value;
            break;

        case 'tipo_solicitud':  
            console.log('set tipo_solicitud = ', variables[variableName].value);
            this.modelBase.tipo_solicitud = variables[variableName].value;
            break;
  
        case 'tipo_motivo':
            console.log('set tipo_motivo = ', variables[variableName].value);
            this.modelBase.tipo_motivo = variables[variableName].value;
            break;

        case 'codigo':
          console.log('set codigo = ', variables[variableName].value);
          this.modelRegistrarData.codigo = variables[variableName].value;
          break;

        case 'description':
          console.log('set description = ', variables[variableName].value);
          this.modelRegistrarData.description = variables[variableName].value;
          break;
          
        case 'importe':
          console.log('set importe = ', variables[variableName].value);
          this.modelRegistrarData.importe = variables[variableName].value;
          break;

        case 'observations':
          console.log('set observations = ', variables[variableName].value);
          this.modelRegistrarData.observations = variables[variableName].value;
          break;
      }
    });
  }

  // Handle any errors that may be present.
  lookForError( result : any ) : void {
    if ( result.error !== undefined && result.error !== null ){
      console.log('routing to app error page ', result.error.message);
      // error while loading task. handle it by redirecting to error page
      this.errorMessage = result.error.message;
      this.router.navigate( 
                            [ 'error'  ], 
                            { queryParams: { message: result.error.message } }  
                          );
    }
  }

  onSubmit() {

    if (this.taskId === null){
        //handle this as an error
        this.errorMessage = 'Task id is empty. Cannot initiate task complete.';
        console.error(this.errorMessage);
        return;
    }

    const variables = this.generateVariablesFromFormFields();
    // basis of completeing the task using the unique id
    this.camundaRestService.postCompleteTask(this.taskId, variables).subscribe();
    this.submitted = true;
  }

  onCancel() {
    console.log('User action cancel');
    this.router.navigate( [ 'tasklist/Revisar'  ], { queryParams: { } }  );    
  }

  override generateVariablesFromFormFields() {
    const variables = {
      "variables" :  {
          "reviewAction"  : { value : 'no'  } ,
          "observations"  : { value : new String('') } ,
      }
    };

    variables.variables["reviewAction"].value = this.model.reviewAction;
    variables.variables["observations"].value = this.model.observations;

    return variables;
  }  

}


