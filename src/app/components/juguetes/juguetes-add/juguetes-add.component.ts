import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JuguetesService} from "../../../services/juguetes.service";
import {Juguete} from "../../../common/interfaceJuguetes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-juguetes-add',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './juguetes-add.component.html',
  styleUrl: './juguetes-add.component.css'
})
export class JuguetesAddComponent implements OnInit{

  private router:Router = inject(Router);
  private readonly juguetesService: JuguetesService = inject(JuguetesService);
  // Para recoger el ID desde la pagina anterior
  @Input('id') id!:string;

  // Para hacer el formulario reactivo de Angular
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  formJuguetes : FormGroup = this.formBuilder.group(
    {
      // Si pongo aqui el "_id: []" - EN ESTE EJERCICIO DE MONGODB ME DA ERROR AL ACTUALIZAR por que es unico este ID
      nombre: [],
      imagen: [],
      categoria: [],
      edadMinima: [],
      precio: []
    }
  );

  // Para poder acceder al previsualizado de lo que hay en el interior del formJuguetes.get ("");
  get nombre () {
    return this.formJuguetes.get('nombre');
  }
  get imagen () {
    return this.formJuguetes.get('imagen');
  }
  get categoria () {
    return this.formJuguetes.get('categoria');
  }
  get edadMinima () {
    return this.formJuguetes.get('edadMinima');
  }
  get precio () {
    return this.formJuguetes.get('precio');
  }

  juguete!:Juguete;

  ngOnInit() {
    this.loadOneJuguete();
  }

  private loadOneJuguete() {
    if (this.id){
      // ADDING - NO TIENE RETURN
      this.juguetesService.getOneJuguete(this.id).subscribe(
        {
          next: value => {
            this.juguete = value;
            // NECESARIO PARA PODER CARGAR LOS INPUTS CON EL ITEM PARA EDITAR
            this.formJuguetes.setControl("id",new FormControl(this.juguete._id));
            this.formJuguetes.setControl("nombre",new FormControl(this.juguete.nombre));
            this.formJuguetes.setControl("imagen",new FormControl(this.juguete.imagen));
            this.formJuguetes.setControl("categoria",new FormControl(this.juguete.categoria));
            this.formJuguetes.setControl("edadMinima",new FormControl(this.juguete.edadMinima));
            this.formJuguetes.setControl("precio",new FormControl(this.juguete.precio));
          },
          error: err => console.log(err),
          complete:() => console.log("Loaded Juguete"),
        }
      );
    } else {
      // NEW
      this.formJuguetes.reset();
      this.juguete = this.formJuguetes.getRawValue() // Esto es para que no se quede en el Loading...
    }

  }

  onSubmit() {
    if (this.id){
      // UPDATE
      this.juguetesService.updateJuguete(this.id, this.formJuguetes.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
            this.router.navigateByUrl("/alljuguetes");
          },
          error: error => console.log(error),
          complete: () => console.log("Editado correctamente"),
        }
      )
    } else {
      // ADD
      this.juguetesService.addJuguete(this.formJuguetes.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
            this.router.navigateByUrl("/alljuguetes");
          },
          error: error => console.log(error),
          complete: () => console.log("Add juguete"),
        }
      )
    }
  }

}
