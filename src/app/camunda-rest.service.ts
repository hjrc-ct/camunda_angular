import { Observable } from 'rxjs';  // rxjs/Observable
import { of } from 'rxjs';          // rxjs/Observable/of
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ProcessDefinition } from './schemas/ProcessDefinition';
import { Task } from './schemas/Task';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 
                              'Content-Type': 'application/json'
                              
                           })
};

@Injectable()
export class CamundaRestService {
  private engineRestUrl = environment.camundaUrl + '/engine-rest/';

  constructor(private http: HttpClient) {
      console.log('Init camunda rest service');
  }

  getTasks(): Observable<Task[]> {
    const endpoint = `${this.engineRestUrl}task?sortBy=created&sortOrder=desc&maxResults=10`;
    return this.http.get<any>(endpoint, httpOptions).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
  }

  getTasksOfType(type : String): Observable<Task[]> {
    const endpoint = `${this.engineRestUrl}task?sortBy=created&sortOrder=desc&maxResults=50&taskDefinitionKey=` + type;
    return this.http.get<any>(endpoint, httpOptions).pipe(
      tap(form => this.log(`fetched tasks of type`)),
      catchError(this.handleError('getTasksOfType', []))
    );
  }
  
  // custom work - input has two params
  // task name from the BPMN process def
  // process instance id 
  getTask(type : String, processInstanceId : String): Observable<Task[]> {
    const endpoint = `${this.engineRestUrl}task?sortBy=created&sortOrder=desc&maxResults=1`
                      + `&processInstanceId=` + processInstanceId
                      + `&taskDefinitionKey=` + type;

    return this.http.get<any>(endpoint, httpOptions).pipe(
      tap(form => this.log(`fetched tasks of type`)),
      catchError(this.handleError('getTask', []))
    );
  }  

  getTaskFormKey(taskId: String): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/form`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched taskform`)),
      catchError(this.handleError('getTaskFormKey', []))
    );
  }

  getVariablesForTask(taskId: String, variableNames: String): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/form-variables?variables=${variableNames}`;
    
    return this.http.get<any>(endpoint, httpOptions).pipe(
      tap(form => {this.log(`fetched variables`,); this.log(form);} ),
      catchError(this.handleError('getVariablesForTask', []))
    );
  }

  postCompleteTask(taskId: String, variables: Object): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/complete`;
    console.log(taskId);
    console.log(variables);
    return this.http.post<any>(endpoint, variables, httpOptions).pipe(
      tap(tasks => this.log(`posted complete task`)),
      catchError(this.handleError('postCompleteTask', []))
    );
  }

  getProcessDefinitionTaskKey(processDefinitionKey: any): Observable<any> {
    const url = `${this.engineRestUrl}process-definition/key/${processDefinitionKey}/startForm`;
    return this.http.get<any>(url).pipe(
      tap(form => this.log(`fetched formkey`)),
      catchError(this.handleError('getProcessDeifnitionFormKey', []))
    );
  }

  getProcessDefinitions(): Observable<ProcessDefinition[]> {
    return this.http.get<ProcessDefinition[]>(this.engineRestUrl + 'process-definition?latestVersion=true', httpOptions).pipe(
      tap(processDefinitions => this.log(`fetched processDefinitions`)),
      catchError(this.handleError('getProcessDefinitions', []))
    );
  }

  postProcessInstance(processDefinitionKey : string, variables : any): Observable<any> {
    const endpoint = `${this.engineRestUrl}process-definition/key/${processDefinitionKey}/start`;
    return this.http.post<any>(endpoint, variables, httpOptions).pipe(
      tap(processDefinitions => this.log(`posted process instance`)),
      catchError(this.handleError('postProcessInstance', []))
    );
  }

  deployProcess(fileToUpload: File): Observable<any> {
    const endpoint = `${this.engineRestUrl}deployment/create`;
    const formData = new FormData();

    formData.append('fileKey', fileToUpload, fileToUpload.name);

    return this.http.post(endpoint, formData);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let propagate the error, so ui can render to the user
      return of(error as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

  public getURL() : String { return this.engineRestUrl; }

    
}
