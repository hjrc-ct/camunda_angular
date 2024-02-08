export class ProcessInstanceData {

  // Captures the new process instance information
  // Only key elements are added here

  constructor(
    
    public businessKey: string,
    public definitionId: string,
    public id: string,
    public tenantId : string = ''
  )  {}
}
