import {Component, inject} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {Juguete} from "../../../common/interfaceJuguetes";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  private readonly cartService: CartService = inject(CartService);
  jugueteList:Juguete[] = [];
  totalPrice:number = 0;

  constructor() {
    this.cartService.carrito.subscribe(
      {
        next: value => {
          this.jugueteList = value;
        },
        error: err => console.log(err),
      }
    )

    this.cartService.carritoPrice.subscribe(
      {
        next: value => {
          this.totalPrice = value;
        },
        error: err => console.log(err.message),
      }
    )
  }


}
