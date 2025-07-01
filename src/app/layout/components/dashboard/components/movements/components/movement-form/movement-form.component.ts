import { CommonModule } from '@angular/common';
import { Component, inject, input, model, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ResourceService } from '../../../../../../../service/resource.service';
import { map, Observable } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { Concept } from '../../../../../../../interface/resource.interface';
import { MovementConceptId } from '../../../../../../../interface/movement.interface';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-movement-form',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    CommonModule,
    SelectModule,
    ButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
  ],
  templateUrl: './movement-form.component.html',
  styles: ``,
})
export class MovementFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private resource = inject(ResourceService);
  private confirmationService = inject(ConfirmationService);
  INCOME_CONCEPTS = new Set([
    MovementConceptId.PURCHASE,
    MovementConceptId.INITIAL_BALANCE
  ]);
  resources$!: Observable<Concept[]>;
  visible = model<boolean>(false);
  form = output<{
    quantity: number;
    unitCost: number;
    concept: Concept;
  }>();
  isEditMode = input<boolean>(false);
  movementForm = this.formBuilder.group({
    quantity: [1, [Validators.required, Validators.min(1)]],
    unitCost: [0, [Validators.required, Validators.min(0)]],
    concept: [{ id: 0, name: '', description: '' }, [Validators.required]],
  });

  ngOnInit(): void {
    this.resources$ = this.resource
      .getConcepts()
      .pipe(map((res) => res.result));
  }
  close() {
    this.visible.set(false);
    console.log(this.movementForm.get('concept')?.value);
  }
  save() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to save this movement?',
      header: 'Confirm',
      accept: () => {
        const movement = {
          quantity: this.movementForm.value.quantity!,
          unitCost: this.movementForm.value.unitCost!,
          concept: this.movementForm.value.concept!,
        };
        this.form.emit(movement);
      }
    })
  }
  hiddenInputQuantity(): string {
    const conceptId = this.movementForm.get('concept')?.value?.id;
    if(conceptId) {
      return '';
    }
    return 'hidden';
  }
  hiddenInputUnitCost(): string{
    const conceptId = this.movementForm.get('concept')?.value?.id;
    if(conceptId && this.INCOME_CONCEPTS.has(conceptId)) {
      return '';
    }
    return 'hidden';
  }
}
