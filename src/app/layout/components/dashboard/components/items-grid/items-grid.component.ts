import { Component, input, output } from '@angular/core';
import { ItemGrid } from '../../../../../interface/util.interface';

@Component({
  selector: 'app-items-grid',
  imports: [],
  templateUrl: './items-grid.component.html'
})
export class ItemsGridComponent {
  items = input<ItemGrid[]>();
  itemSelected = output<number>();
  onItemSelected(id: number){
    this.itemSelected.emit(id);
  }
}
