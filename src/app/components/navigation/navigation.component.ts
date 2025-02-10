import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  private readonly cartService: CartService = inject(CartService);
  carritoCount:number = 0;

  constructor() {
    this.cartService.carritoCount.subscribe(
      {
        next: value => {
          this.carritoCount = value;
        },
        error: err => console.log(err),
      }
    )
  }
}
