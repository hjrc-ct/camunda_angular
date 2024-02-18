import { CamundaRestService } from '../../camunda-rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyProcessData } from '../../schemas/MyProcessData';
import { ProcessInstanceData } from '../../schemas/ProcessInstanceData';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


export class StartProcessInstanceComponent {
  model!: MyProcessData;
  instanceCreated! : ProcessInstanceData;
  submitted: boolean = false
  errorMessage : string | null

  constructor(
    private camundaRestService: CamundaRestService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.route = route;
      this.camundaRestService = camundaRestService;
      this.errorMessage = null;
      this.router = router;
  }

  onSubmit() {
    console.log('Submit New Process with input data...');
    this.route.params.subscribe(params => {
      const processDefinitionKey = params['processdefinitionkey'];
      const variables = this.generateVariablesFromFormFields();
      console.log(variables);
      this.camundaRestService.postProcessInstance(processDefinitionKey, variables)
          .subscribe( instanceOutput => { 

            this.lookForError(instanceOutput);

            console.log(instanceOutput); 
            this.instanceCreated = new ProcessInstanceData(
              instanceOutput.businessKey,
              instanceOutput.definitionId,
              instanceOutput.id,
              instanceOutput.tenantId
            );
          } );
      
      this.submitted = true;
    });
  }

  // Handle any errors that may be present.
  lookForError( result : any ) : void {
    if ( result.error !== undefined && result.error !== null ){
      
      // error while loading tasklist. handle it by redirecting to error page
      this.errorMessage = result.message 
                            ? ( result.name + " " + result.message ) 
                            : result.error.message;
      console.log('routing to app error page ', this.errorMessage);
      // TODO - handle error
      this.router.navigate( [ 'error'  ], { queryParams: { message: this.errorMessage } }  );
    }
  }

  getCreatedId() : string { 
    if ( this.instanceCreated 
                && this.instanceCreated.id != null
                && this.instanceCreated.id != '' )
      return this.instanceCreated.id;

    return '';
  }
  generateVariablesFromFormFields() {

    // let outervariables = {
    //   variables: { }
    // };
    // Object.keys(this.model).forEach((field) => {
    //   outervariables.variables[field] = {
    //     value: this.model[field]
    //   };
    // });

    // send data as json using 'variables' as parent
    return { 
              variables: { 
                  // TODO - this has to be modified with new format
                  tipo_solicitud : { value : this.model.tipo_solicitud },
                  tipo_motivo  : { value : this.model.tipo_motivo  },
                  tipo_cumplimiento  : { value : this.model.tipo_cumplimiento  }
              }
           }
  }
}
