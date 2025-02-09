import {Component, inject, OnInit} from '@angular/core';
import {JuguetesService} from "../../../services/juguetes.service";
import {Juguete} from "../../../common/interfaceJuguetes";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-juguetes-list',
  standalone: true,
  imports: [
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './juguetes-list.component.html',
  styleUrl: './juguetes-list.component.css'
})
export class JuguetesListComponent implements OnInit{
  private readonly apiService: JuguetesService = inject(JuguetesService);
  protected readonly faTrash = faTrash;
  protected readonly faPenToSquare = faPenToSquare;
  juguetes!:Juguete[];  // recogemos el Array de Objetos que tiene El objeto principal (ApiJuguetes) que es lo que nos devuelve la API

  ngOnInit() {
    this.loadJuguetes();
  }

  public loadJuguetes() {
    return this.apiService.getAllJuguetes().subscribe(
      {
        next:value => this.juguetes = value.juguetes,
        error: error => console.log(error),
        complete: () => console.log('Juguetes ListComponent loaded.'),
      }
    );
  }

  deleteItem(_id: string) {
    //DeleteItem
    if (confirm("Are you sure, about delete item?")) {
      this.apiService.deleteJuguete(_id).subscribe(
        {
          next:value => {console.log(value)},
          error:err => console.log(err.message()),
          complete:() => console.log('Delete juguete'),
        }
      )
    } else {
      alert("NO");
    }
  }

}
