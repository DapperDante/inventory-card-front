import { Component, inject, input, model, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-product-form',
  imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  private formBuilder = inject(FormBuilder);

  visible = model<boolean>(false);
  form = output<{ name: string, description: string }>();
  isEditMode = input<boolean>(false);

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  close() {
    this.visible.set(false);
  }
  save() {
    this.form.emit({ name: this.productForm.value.name!, description: this.productForm.value.description! });
  }
}
