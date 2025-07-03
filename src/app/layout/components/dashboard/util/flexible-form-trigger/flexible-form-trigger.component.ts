import { CommonModule } from '@angular/common';
import { Component, ContentChild, model, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-flexible-form-trigger',
  imports: [CommonModule],
  templateUrl: './flexible-form-trigger.component.html',
  styles: ``
})
export class FlexibleFormTriggerComponent {
  @ContentChild('formTemplate') formTemplate!: TemplateRef<any>;
  visible = model<boolean>(false);
  openForm(){
    this.visible.set(true);
  }
}
