import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hola-mundo',
  standalone: true,
  imports: [],
  templateUrl: './hola-mundo.component.html',
  styleUrl: './hola-mundo.component.css'
})
export class HolaMundoComponent {
    titulo="Ingreso de datos"; 
    formularioContacto=new FormGroup({
    nombre:new FormControl(' '),
    edad:new FormControl(0),
    email:new FormControl('') 

    });
  }