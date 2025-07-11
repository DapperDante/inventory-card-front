import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CompanyService } from '../../../../../service/company.service';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsGridComponent } from "../items-grid/items-grid.component";
import { map } from 'rxjs';
import { CompanyAdapter } from '../../../../../class/adapter/company-adapter';
import { ItemGrid } from '../../../../../interface/util.interface';
import { FormTriggerComponent } from '../../util/form-trigger/form-trigger.component';

@Component({
  selector: 'app-companies',
  imports: [
    OverlayBadgeModule,
    InputTextModule,
    CompanyFormComponent,
    CommonModule,
    ItemsGridComponent,
    FormTriggerComponent
],
  templateUrl: './companies.component.html',
  styles: ``,
})
export class CompaniesComponent implements OnInit{
  private companyService = inject(CompanyService);
  private notification = inject(NotificationService);
  private router = inject(Router);
  private activedRoute = inject(ActivatedRoute);

  companies$!: Observable<ItemGrid[]>;
  companyFormVisible = false;

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies()
    .pipe(
      map(res => res.result ? CompanyAdapter.toGridItems(res.result) : [])
    );
  }
  addCompany(data: { name: string }) {
    this.companyService.addCompany(data.name).subscribe({
      next: () => {
        this.companyFormVisible = false;
        this.router.navigate(['../products'], {relativeTo: this.activedRoute});
      },
      error: () => {
        this.notification.showError('Error adding company');
      }
    });
  }
  accessCompany(id: number){
    this.companyService.accessCompany(id).subscribe({
      next: () => {
        this.router.navigate(['../products'], {relativeTo: this.activedRoute});
      },
      error: () => {
        this.notification.showError('Error accessing company');
      }
    });
  }
}
