import { Component, inject } from '@angular/core';
import { MovementService } from '../../../../../service/movement.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormTriggerComponent } from '../form-trigger/form-trigger.component';
import { TableModule } from 'primeng/table';
import { MovementAdapter } from '../../../../../class/adapter/movement-adapter';
import { MovementFormComponent } from "./components/movement-form/movement-form.component";
import { NotificationService } from '../../../../../service/notification.service';

@Component({
  selector: 'app-movements',
  imports: [CommonModule, FormTriggerComponent, TableModule, MovementFormComponent],
  templateUrl: './movements.component.html',
})
export class MovementsComponent {
  private movementService = inject(MovementService);
  private notification = inject(NotificationService);

  movements$!: Observable<any>;
  movementFormVisible = false;
  operation$: Observable<void> | undefined;

  ngOnInit() {
    this.updateTable();
  }
  addMovement(data: {quantity: number, unitCost: number, concept: any}){
    console.log(data);
    switch(data.concept.id){
      case 1: // purchase
        this.operation$ = this.movementService.purchase(data.quantity, data.unitCost);
        break;
      case 2: // sale
        this.operation$ = this.movementService.sale(data.quantity);
        break;
      case 3: // purchase return
        this.operation$ = this.movementService.purchaseReturn(data.quantity);
        break;
      case 4:  // initial balance
        this.operation$ = this.movementService.initialBalance(data.quantity, data.unitCost);
        break;
      case 5: // sale return
        this.operation$ = this.movementService.saleReturn(data.quantity);
        break;
      case 6: // production required
        this.operation$ = this.movementService.productionRequired(data.quantity);
        break;
      case 7: // production return
        this.operation$ = this.movementService.productionReturn(data.quantity);
        break;
    }
    this.operation$?.subscribe({
      next: () => {
        this.notification.showSuccess('Operation performed successfully');
        this.movementFormVisible = false;
        this.updateTable();
      },
      error: () => {
        this.notification.showError('Error performing the operation')
      }
    });
    // this.movementService.addMovement(data).subscribe(() => {
    //   this.movements$ = this.movementService.getMovements()
    //     .pipe(map((res) => res.result ? MovementAdapter.toTableMovements(res.result) : []));
    // });
  }
  updateTable(){
    this.movements$ = this.movementService.getMovements()
      .pipe(map((res) => res.result ? MovementAdapter.toTableMovements(res.result) : []));
  }
}
