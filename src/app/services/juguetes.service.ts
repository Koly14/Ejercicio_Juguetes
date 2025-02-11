import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiJuguetes, Juguete, StatusMessage, UpdateStatusMessage} from "../common/interfaceJuguetes";
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class JuguetesService {
  private readonly http: HttpClient = inject(HttpClient);
  private urlApi: string = environment.urlBase;

  constructor() {
  }

  getAllJuguetes():Observable<ApiJuguetes> {  // LA API nos devuelve un Objeto que dentro tiene un Array de Objetos
    return this.http.get<ApiJuguetes>(this.urlApi+'/alljuguetes');
  }

  //PAGINADA
  getAllPagedJuguetes(page:number):Observable<ApiJuguetes>{
    return this.http.get<ApiJuguetes>(this.urlApi+'/juguetes?page='+page);
  }

  // JUGUETE BY NAME
  getJugueteByName(name:string):Observable<Juguete[]> {
    return this.http.get<Juguete[]>(this.urlApi+'/jugueteByName/'+name);
  }

  // LA API NOS DEVUELVE AQUI UN JUGUETE
  getOneJuguete(id:string):Observable<Juguete>{
    return this.http.get<Juguete>(this.urlApi+'/juguete/'+id);
  }

  addJuguete(juguete:Juguete):Observable<StatusMessage>{
    return this.http.post<StatusMessage>(this.urlApi+'/juguetes', juguete);
  }

  updateJuguete(id:string, juguete:Juguete):Observable<UpdateStatusMessage> {
    return this.http.patch<UpdateStatusMessage>(this.urlApi+'/update/'+id, juguete);
  }

  deleteJuguete(id:string):Observable<StatusMessage> {
    return this.http.delete<StatusMessage>(this.urlApi+'/delete/'+id);
  }

}

