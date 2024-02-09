import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css'
})
export class Page404Component {
   mensaje : string | null ="404: Pagina no encontrada"

   constructor(route: ActivatedRoute ) {

      route.queryParamMap.subscribe ( (qParams: { get: (arg0: string) => string | null; } | null) => { 
        if ( null !== qParams && null !== qParams.get('message') ) {
              this.mensaje = qParams.get('message');
        }

      })      
  }
}
