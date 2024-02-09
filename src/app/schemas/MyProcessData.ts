export class MyProcessData {

  // Input data elements to submit or create a
  // new instance of the BPMN process

  constructor(
    // request type
    public tipo_solicitud    : string = '',
    // reason type
    public tipo_motivo       : string = '',
    // compliance type
    public tipo_cumplimiento : string = ''
  ) {  }

}
