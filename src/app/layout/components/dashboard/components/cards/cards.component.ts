import { Component, inject } from '@angular/core';
import { CardFormComponent } from "./components/card-form/card-form.component";
import { ItemsGridComponent } from "../items-grid/items-grid.component";
import { CardService } from '../../../../../service/card.service';
import { NotificationService } from '../../../../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemGrid } from '../../../../../interface/util.interface';
import { map, Observable } from 'rxjs';
import { CardAdapter } from '../../../../../class/adapter/card-adapter';
import { CommonModule } from '@angular/common';
import { FormTriggerComponent } from '../form-trigger/form-trigger.component';

@Component({
  selector: 'app-cards',
  imports: [CardFormComponent, ItemsGridComponent, CommonModule, FormTriggerComponent],
  templateUrl: './cards.component.html'
})
export class CardsComponent {
  private cardService = inject(CardService);
  private notification = inject(NotificationService);
  private router = inject(Router);
  private activedRoute = inject(ActivatedRoute);

  cards$!: Observable<ItemGrid[]>;
  cardFormVisible = false;

  ngOnInit() {
    this.cards$ = this.cardService
      .getCards()
      .pipe(map((res) => res.result ? CardAdapter.toGridItems(res.result) : []));
  }
  addCard(data: {name: string, description: string, method: any, currency: any, date: any}) {
    this.cardService.addCard(data.method.id, data.currency.id, data.name, data.description, data.date).subscribe({
      next: () => {
        this.cardFormVisible = false;
        this.router.navigate(['../movements'], { relativeTo: this.activedRoute });
      },
      error: () => {
        this.notification.showError('Error adding product');
      },
    });
  }
  accessCard(id: number) {
    this.cardService.accessCard(id).subscribe({
      next: () => {
        this.router.navigate(['../movements'], { relativeTo: this.activedRoute });
      },
      error: () => {
        this.notification.showError('Error accessing card');
      }
    });
  }
}
