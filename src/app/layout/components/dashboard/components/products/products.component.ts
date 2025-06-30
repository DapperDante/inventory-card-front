import { Component, inject } from '@angular/core';
import { ItemsGridComponent } from '../items-grid/items-grid.component';
import { ProductService } from '../../../../../service/product.service';
import { NotificationService } from '../../../../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ItemGrid } from '../../../../../interface/util.interface';
import { ProductAdapter } from '../../../../../class/adapter/product-adapter';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormTriggerComponent } from "../form-trigger/form-trigger.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [ItemsGridComponent, CommonModule, ProductFormComponent, FormTriggerComponent, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent {
  private productService = inject(ProductService);
  private notification = inject(NotificationService);
  private router = inject(Router);
  private activedRoute = inject(ActivatedRoute);

  products$!: Observable<ItemGrid[]>;
  productFormVisible = false;

  ngOnInit() {
    this.products$ = this.productService
      .getProducts()
      .pipe(map((res) => res.result ? ProductAdapter.toGridItems(res.result) : []));
  }
  addProduct(data: { name: string; description: string }) {
    this.productService.addProduct(data.name, data.description).subscribe({
      next: () => {
        this.productFormVisible = false;
        this.router.navigate(['../cards'], { relativeTo: this.activedRoute });
      },
      error: () => {
        this.notification.showError('Error adding product');
      },
    });
  }
  accessProduct(id: number) {
    this.productService.accessProduct(id).subscribe({
      next: () => {
        this.router.navigate(['../cards'], { relativeTo: this.activedRoute });
      },
      error: () => {
        this.notification.showError('Error accessing product');
      }
    });
  }
}
