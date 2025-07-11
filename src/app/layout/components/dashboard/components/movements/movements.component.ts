import { Component, inject } from '@angular/core';
import { MovementService } from '../../../../../service/movement.service';
import { forkJoin, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MovementAdapter } from '../../../../../class/adapter/movement-adapter';
import { MovementFormComponent } from './components/movement-form/movement-form.component';
import { NotificationService } from '../../../../../service/notification.service';
import { ButtonModule } from 'primeng/button';
import {
  TableBalance,
  TableMovement,
} from '../../../../../interface/util.interface';
import { FileService } from '../../../../../service/file.service';
import { FlexibleFormTriggerComponent } from '../../util/flexible-form-trigger/flexible-form-trigger.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movements',
  imports: [
    CommonModule,
    FlexibleFormTriggerComponent,
    TableModule,
    MovementFormComponent,
    ButtonModule,
  ],
  templateUrl: './movements.component.html',
})
export class MovementsComponent {
  private movementService = inject(MovementService);
  private notification = inject(NotificationService);
  private fileService = inject(FileService);
  pdfUrl: SafeResourceUrl | null = null;
  table$!: Observable<[TableMovement[], TableBalance[]]>;
  movementFormVisible = false;
  operation$: Observable<void> | undefined;
  async ngOnInit() {
    this.updateTable();
  }
  addMovement(data: { quantity: number; unitCost: number; concept: any }) {
    switch (data.concept.id) {
      case 1: // purchase
        this.operation$ = this.movementService.purchase(
          data.quantity,
          data.unitCost
        );
        break;
      case 2: // sale
        this.operation$ = this.movementService.sale(data.quantity);
        break;
      case 3: // purchase return
        this.operation$ = this.movementService.purchaseReturn(data.quantity);
        break;
      case 4: // initial balance
        this.operation$ = this.movementService.initialBalance(
          data.quantity,
          data.unitCost
        );
        break;
      case 5: // sale return
        this.operation$ = this.movementService.saleReturn(data.quantity);
        break;
      case 6: // production required
        this.operation$ = this.movementService.productionRequired(
          data.quantity
        );
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
        this.notification.showError('Error performing the operation');
      },
    });
  }
  updateTable() {
    this.table$ = forkJoin([
      this.movementService
        .getMovements()
        .pipe(
          map((res) =>
            res.result ? MovementAdapter.toTableMovements(res.result) : []
          )
        ),
      this.movementService
        .getBalances()
        .pipe(
          map((res) =>
            res.result ? MovementAdapter.toTableBalances(res.result) : []
          )
        ),
    ]);
  }
  exportToCSV(data: TableMovement[]) {
    this.fileService.exportTableToCSV(data);
  }
  exportToExcel(data: TableMovement[], tableBalance: TableBalance[]) {
    this.fileService.exportTableMovementsToXLSX(data, tableBalance);
  }
  exportToPDF(data: TableMovement[], tableBalance: TableBalance[]) {
    this.fileService.exportTableMovementsToPDF(data, tableBalance);
  }
}
