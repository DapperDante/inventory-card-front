import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CompanyService } from '../../../service/company.service';
import { ProductService } from '../../../service/product.service';
import { CardService } from '../../../service/card.service';
import { MovementService } from '../../../service/movement.service';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'companies',
        providers: [CompanyService],
        loadComponent: () =>
          import('./components/companies/companies.component').then(
            (c) => c.CompaniesComponent
          ),
      },
      {
        path: 'products',
        providers: [ProductService],
        loadComponent: () =>
          import('./components/products/products.component').then(
            (c) => c.ProductsComponent
          ),
      },
      {
        path: 'cards',
        providers: [CardService],
        loadComponent: () =>
          import('./components/cards/cards.component').then(
            (c) => c.CardsComponent
          ),
      },
      {
        path: 'movements',
        providers: [MovementService],
        loadComponent: () =>
          import('./components/movements/movements.component').then(
            (c) => c.MovementsComponent
          ),
      },
      {
        path: '',
        redirectTo: 'companies',
        pathMatch: 'full',
      },
    ],
  },
];
