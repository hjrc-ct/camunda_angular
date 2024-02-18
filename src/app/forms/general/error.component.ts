import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-error',
    standalone: false,
    templateUrl: './error.component.html',
    styleUrls: [],
    providers: [ HttpClientModule],
    exportAs: 'app-error'
  })
export class errorComponent implements OnInit {
    route : any;
    public message : any | null = 'Unknown application error'; // default message

  constructor(
    route: ActivatedRoute,
    router: Router ) {
      this.route = route;
  }


  ngOnInit(){
    console.log('error page - on init - lets parse error message');
    this.route.params.subscribe ( (params : Params) => { 
      if ( params['message'] ) {
            this.message = params['message'];
      }
    })


    this.route.queryParamMap.subscribe ( (qParams: { get: (arg0: string) => string | null; }) => {
      if (  null !== qParams?.get('message') ) {
            this.message = qParams.get('message');
      }
    })    
  }

}