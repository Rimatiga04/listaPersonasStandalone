import { Component } from '@angular/core';

import { RouterLink, Router } from '@angular/router';
import { PAjaxService } from '../../servicios/p-ajax.service';
import { Persona } from '../../modelos/persona';

@Component({
  selector: 'app-listado',
  imports: [RouterLink],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {
  public listaPer: Persona[] = [];


  constructor(private peticion: PAjaxService, private ruta: Router) {
    this.peticion.listar().subscribe(daticos => {
      console.log("Tamos en el constructor", daticos);
      this.listaPer = daticos;
    });
  }
  ngOnInit() {

  }

  borre(id: number, nombre: string) {
    console.log("Parametros", id, nombre);
    if (confirm("¿Esta seguro de que quiere eliminar a: " + nombre + "?")) {
      this.peticion.borrar(id).subscribe(datos => {
        this.listaPer = datos;
      });
      console.log("DONE");
    }
  }


  iraNuevaPersona() {
    this.ruta.navigate(['personas-add', -1])
  }
}
