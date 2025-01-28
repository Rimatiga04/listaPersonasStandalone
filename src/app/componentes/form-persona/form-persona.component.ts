import { Component } from '@angular/core';
import { PAjaxService } from '../../servicios/p-ajax.service';
import { Persona } from '../../modelos/persona';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-persona',
  imports: [FormsModule, RouterLink],
  templateUrl: './form-persona.component.html',
  styleUrl: './form-persona.component.css'
})
export class FormPersonaComponent {
  public persona: Persona = <Persona>{};
  public textoBoton: string;

  constructor(private peticion: PAjaxService, private ruta: Router, private route: ActivatedRoute) {
    this.persona.id = -1;
    this.textoBoton = "AÑADIR";
  }

  ngOnInit() {
    const personaId = this.route.snapshot.params["id"];
    console.log("id=", personaId);
    if (personaId == -1) {
      this.textoBoton = "AÑADIR"
    } else {
      this.textoBoton = "MODIFICAR";
      this.peticion.selPersonaId(personaId).subscribe({
        next: res => {
          this.persona = res;
        },
        error: error => console.log("Error:", error)
      });
    }
  }

  onSubmit() {
    console.log("This.Persona", this.persona);
    if (this.persona.id == -1) {
      this.peticion.insertar(this.persona).subscribe(datos => {
        this.ruta.navigate(["/"]);
      });
    }
    else {
      this.peticion.modificar(this.persona).subscribe(datos => {
        // this.persona.id = -1;
        this.ruta.navigate(["/"]);
      })
    }

  }
}
