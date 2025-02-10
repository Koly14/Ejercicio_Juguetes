import { Routes } from '@angular/router';
import {JuguetesListComponent} from "./components/juguetes/juguetes-list/juguetes-list.component";
import {JuguetesAddComponent} from "./components/juguetes/juguetes-add/juguetes-add.component";
import {CartComponent} from "./components/juguetes/cart/cart.component";

export const routes: Routes =
  [
    {
      path: 'alljuguetes',
      component: JuguetesListComponent
    },
    {
      path: 'juguetes',
      component: JuguetesAddComponent,
    },
    {
      path: 'update/:id',
      component: JuguetesAddComponent,
    },
    {
      path: 'juguete/cart',
      component: CartComponent,
    },
    {
      path: '',
      redirectTo: 'alljuguetes',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'alljuguetes',
      pathMatch: 'full',
    }
];
