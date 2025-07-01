import { Routes } from '@angular/router';
import { guestGuard } from './guard/guest.guard';
import { authGuard } from './guard/auth.guard';
import { CompanyService } from './service/company.service';
import { ProductService } from './service/product.service';
import { CardService } from './service/card.service';
import { MovementService } from './service/movement.service';
import { FileService } from './service/file.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing.component').then(c => c.LandingComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    providers: [FileService],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./layout/components/dashboard/dashboard.component').then(c => c.DashboardComponent),
        children: [
          {
            path: 'companies',
            providers: [CompanyService],
            loadComponent: () => import('./layout/components/dashboard/components/companies/companies.component').then(c => c.CompaniesComponent)
          },
          {
            path: 'products',
            providers: [ProductService],
            loadComponent: () => import('./layout/components/dashboard/components/products/products.component').then(c => c.ProductsComponent)
          },
          {
            path: 'cards',
            providers: [CardService],
            loadComponent: () => import('./layout/components/dashboard/components/cards/cards.component').then(c => c.CardsComponent)
          },
          {
            path: 'movements',
            providers: [MovementService],
            loadComponent: () => import('./layout/components/dashboard/components/movements/movements.component').then(c => c.MovementsComponent)
          },
          {
            path: '',
            redirectTo: 'companies',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ],
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
