import { Component } from '@angular/core';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [TopbarComponent, RouterModule, FooterComponent],
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent {

}
