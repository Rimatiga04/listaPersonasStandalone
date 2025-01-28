import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from "../modelos/persona";
@Injectable({
  providedIn: 'root'
})
export class PAjaxService {
  private url: string = "http://localhost/AJAX/listaPersonas/servidor.php"
  constructor(private http: HttpClient) {

  }
  listar() {
    let cuerpo = {
      servicio: "listar"
    };
    //return this.http.post(this.url, cuerpo);
    return this.http.post<Persona[]>(this.url, cuerpo);
  }

  borrar(id: number) {
    let cuerpo = {
      servicio: "borrar",
      id: id
    };
    return this.http.post<Persona[]>(this.url, cuerpo);
  }

  insertar(persona: Persona) {
    let pa = JSON.parse(JSON.stringify(persona));
    pa.servicio = "insertar";
    console.log("pa", pa);
    return this.http.post<Persona[]>(this.url, JSON.stringify(pa));
  }

  selPersonaId(id: number) {
    let cuerpo = {
      servicio: "selPersonaID",
      id: id
    }
    return this.http.post<Persona>(this.url, cuerpo);
  }

  modificar(persona: Persona) {
    let pa = JSON.parse(JSON.stringify(persona));
    pa.servicio = "modificar";
    console.log("pa", pa);
    return this.http.post<Persona>(this.url, JSON.stringify(pa));
  }
}
