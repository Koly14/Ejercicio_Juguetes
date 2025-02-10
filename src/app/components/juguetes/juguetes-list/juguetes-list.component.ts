import {Component, inject, OnInit} from '@angular/core';
import {JuguetesService} from "../../../services/juguetes.service";
import {Juguete} from "../../../common/interfaceJuguetes";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCartShopping, faPenToSquare, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {SearchService} from "../../../services/search.service";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-juguetes-list',
  standalone: true,
  imports: [
    RouterLink,
    FaIconComponent,
    NgbPagination
  ],
  templateUrl: './juguetes-list.component.html',
  styleUrl: './juguetes-list.component.css'
})
export class JuguetesListComponent implements OnInit{
  private readonly apiService: JuguetesService = inject(JuguetesService);
  private readonly searchService: SearchService = inject(SearchService);
  private readonly cartService: CartService = inject(CartService);


  juguetes!:Juguete[];  // recogemos el Array de Objetos que tiene El objeto principal (ApiJuguetes) que es lo que nos devuelve la API
  totalCollect!:number;
  pageSize:number = 1;
  page:number = 1;

  protected readonly faCartShopping = faCartShopping;
  protected readonly faTrash = faTrash;
  protected readonly faPenToSquare = faPenToSquare;

  ngOnInit() {
    this.loadJuguetes();
    this.loadSearch();
  }

  public loadJuguetes() {
    return this.apiService.getAllPagedJuguetes(this.page).subscribe(
      {
        next:value => {
          this.juguetes = value.juguetes.juguetes;
          this.pageSize = value.juguetes.info.pages
          this.totalCollect = value.juguetes.info.total;
        },
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

  // BUSQUEDA
  private loadSearch() {
    // inicia el observable
    this.searchService.start().subscribe(
      {
        next: value => {
          this.juguetes = value;
        },
        error:err => console.log(err.message),
      }
    )
  }
  buscar(event:any){
    const word = event.target.value;
     if (word){
      this.searchService.search(word);
    } else {
      this.loadJuguetes();
    }
  }

  // CART
  addToCArt(juguete: Juguete) {
    this.cartService.addToCart(juguete);
  }

}
