import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, model, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-form-trigger',
  imports: [NgTemplateOutlet],
  templateUrl: './form-trigger.component.html',
  styles: ``
})
export class FormTriggerComponent {
  @ContentChild('formTemplate') formTemplate!: TemplateRef<any>;
  visible = model<boolean>(false);
  openForm(){
    this.visible.set(true);
  }
}
