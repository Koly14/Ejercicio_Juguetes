import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Juguete} from "../common/interfaceJuguetes";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carrito: BehaviorSubject<Juguete[]> = new BehaviorSubject<Juguete[]>([]);
  carritoCount:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  carritoPrice:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(juguete:Juguete){
    var carritoAux: Juguete[] = this.carrito.value;

    carritoAux.push(juguete);
    this.carrito.next(carritoAux);
    this.carritoCount.next(carritoAux.length);
    this.carritoPrice.next(this.carritoPrice.value+juguete.precio);

  }

}
