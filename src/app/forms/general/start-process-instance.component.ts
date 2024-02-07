import { CamundaRestService } from '../../camunda-rest.service';
import { ActivatedRoute } from '@angular/router';
import { MyProcessData } from '../../schemas/MyProcessData';
import { ProcessInstanceData } from '../../schemas/ProcessInstanceData';

export class StartProcessInstanceComponent {
  model!: MyProcessData;
  instanceCreated! : ProcessInstanceData;
  submitted: boolean = false
  route: ActivatedRoute
  camundaRestService: CamundaRestService

  constructor(route: ActivatedRoute,
    camundaRestService: CamundaRestService
    ) {
      this.route = route;
      this.camundaRestService = camundaRestService;
  }
  onSubmit() {
    console.log('Submit New Process with input data...');
    this.route.params.subscribe(params => {
      const processDefinitionKey = params['processdefinitionkey'];
      const variables = this.generateVariablesFromFormFields();
      console.log(variables);
      this.camundaRestService.postProcessInstance(processDefinitionKey, variables)
          .subscribe( instanceOutput => { 
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
