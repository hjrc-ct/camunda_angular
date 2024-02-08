export class MyProcessData {

  // Input data elements to submit or create a
  // new instance of the BPMN process

  constructor(
    public tipo_solicitud    : string = '',
    public tipo_motivo       : string = '',
    public tipo_cumplimiento : string = ''
  ) {  }

}
