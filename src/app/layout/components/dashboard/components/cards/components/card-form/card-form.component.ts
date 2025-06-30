import { Component, inject, input, model, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ResourceService } from '../../../../../../../service/resource.service';
import { SelectModule } from 'primeng/select';
import { forkJoin, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ResourceAdapter } from '../../../../../../../class/adapter/resource-adapter';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-card-form',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    SelectModule,
    CommonModule,
    DatePickerModule
  ],
  templateUrl: './card-form.component.html',
  styles: ``,
})
export class CardFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private resource = inject(ResourceService);
  resources$!: Observable<[any[], any[]]>;
  visible = model<boolean>(false);
  form = output<{ name: string; description: string, method: any, currency: any, date: any }>();
  isEditMode = input<boolean>(false);

  cardForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    method: [null, [Validators.required]],
    currency: [null, [Validators.required]],
    date: [null, [Validators.required]],
  });
  ngOnInit(): void {
    this.resources$ = forkJoin([
      this.resource.getMethods().pipe(map(res => ResourceAdapter.MethodsToSelectOptions(res.result))),
      this.resource.getCurrencies().pipe(map(res => ResourceAdapter.CurrenciesToSelectOptions(res.result))),
    ]);
  }
  close() {
    this.visible.set(false);
  }
  save() {
    const card = {
      name: this.cardForm.value.name!,
      description: this.cardForm.value.description!,
      method: this.cardForm.value.method!,
      currency: this.cardForm.value.currency!,
      date: this.cardForm.value.date!
    };
    this.form.emit(card);
  }
}
