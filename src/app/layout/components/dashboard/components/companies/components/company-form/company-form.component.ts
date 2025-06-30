import { Component, inject, input, model, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-company-form',
  imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './company-form.component.html',
})
export class CompanyFormComponent {
  private formBuilder = inject(FormBuilder);

  visible = model<boolean>(false);
  form = output<{ name: string }>();
  isEditMode = input<boolean>(false);

  companyForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  close() {
    this.visible.set(false);
  }
  save() {
    this.form.emit({ name: this.companyForm.value.name! });
  }
}
