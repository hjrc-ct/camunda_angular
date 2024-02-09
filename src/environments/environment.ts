export const environment = {
    production:     false,
    
    text:           'This is development environment',

    // use localhost or any other valid server name
    camundaUrl:     'http://localhost:8080',

    // Angular UI app is associated with below BPMN process key
    procesName:     'process_modelo',

    // Task type 1 - Register - the value maps to the id attribute 'Registrar Solicitud' from bpmn
    taskType_Registrar : 'Activity_0jafldx',

    // Task type 2 - Review   - the value maps to the id attribute 'Revisar Solicitud' from bpmn
    taskType_Revisar   : 'Activity_0wf5xb7',

  };