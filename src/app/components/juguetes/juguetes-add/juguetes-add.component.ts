import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JuguetesService} from "../../../services/juguetes.service";
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

  loaded:boolean = false;

  // Para hacer el formulario reactivo de Angular
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  formJuguetes : FormGroup = this.formBuilder.group(
    {
      id: [],
      nombre: ["",[Validators.required,Validators.minLength(3)]],
      imagen: ["",[Validators.required]],
      categoria: ["",[Validators.required,Validators.minLength(3)]],
      edadMinima: [0,[Validators.required, Validators.min(5)]],
      precio: [0,[Validators.required, Validators.min(1)]]
    }
  );

  // Para poder acceder al previsualizado de lo que hay en el interior del formJuguetes.get ("");
  get nombre ():any {
    return this.formJuguetes.get('nombre');
  }
  get imagen ():any  {
    return this.formJuguetes.get('imagen');
  }
  get categoria ():any  {
    return this.formJuguetes.get('categoria');
  }
  get edadMinima ():any  {
    return this.formJuguetes.get('edadMinima');
  }
  get precio ():any  {
    return this.formJuguetes.get('precio');
  }


  ngOnInit() {
    this.loadOneJuguete();
  }

  private loadOneJuguete() {
    if (this.id){
      // ADDING
      this.juguetesService.getOneJuguete(this.id).subscribe(
        {
          next: value => {
            // NECESARIO PARA PODER CARGAR LOS INPUTS CON EL ITEM PARA EDITAR
            this.formJuguetes.patchValue(value); // Si hay campos que no interesan poner para rellenar se pone esto
            this.loaded = true; // Para que cargue la pagina
          },
          error: err => console.log(err),
          complete:() => console.log("Loaded Juguete"),
        }
      );
    } else {
      // NEW
      this.loaded = true; // Para que cargue la pagina
      this.formJuguetes.reset();
    }

  }

  onSubmit() {
    if(this.formJuguetes.invalid){
      this.formJuguetes.markAllAsTouched();
      return;
    }
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
