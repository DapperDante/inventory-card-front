import { CommonModule } from '@angular/common';
import { Component, inject, input, model, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ResourceService } from '../../../../../../../service/resource.service';
import { map, Observable } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-movement-form',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    CommonModule,
    SelectModule,
    ButtonModule,
    InputNumberModule,
  ],
  templateUrl: './movement-form.component.html',
  styles: ``,
})
export class MovementFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private resource = inject(ResourceService);

  resources$!: Observable<any[]>;
  visible = model<boolean>(false);
  form = output<{
    quantity: number,
    unitCost: number,
    concept: number
  }>();
  isEditMode = input<boolean>(false);
  cardForm = this.formBuilder.group({
    quantity: [1, [Validators.required, Validators.min(1)]],
    unitCost: [0, [Validators.required, Validators.min(0)]],
    concept: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.resources$ = this.resource
      .getConcepts()
      .pipe(map((res) => res.result));
  }
  close() {
    this.visible.set(false);
  }
  save() {
    const movement = {
      quantity: this.cardForm.value.quantity!,
      unitCost: this.cardForm.value.unitCost!,
      concept: this.cardForm.value.concept!,
    };
    this.form.emit(movement);
  }
}
