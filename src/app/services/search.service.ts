import {inject, Injectable} from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, Subject, switchMap} from "rxjs";
import {Juguete} from "../common/interfaceJuguetes";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly url: string = environment.urlBase;

  private palabra: Subject<string> = new Subject<string>();
  private jugueteSearched$: Observable<Juguete[]> = this.palabra.pipe(
    switchMap(response => {
      return this.http.get<Juguete[]>(this.url+'/jugueteByName/'+response).pipe(
        // Si salta un error devolvemos el array vacio
        catchError(error => of([]))
      );
    }),
  );

  constructor() { }

  search(searchWord:string){
    this.palabra.next(searchWord);
  }

  start():Observable<Juguete[]>{
    return this.jugueteSearched$; // El observable al final tiene dolar $ por nomenclatura y buena pracxis
  }

}
