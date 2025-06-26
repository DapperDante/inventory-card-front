import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DividerModule,
    TagModule
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent {

  features = [
    {
      icon: 'pi pi-box',
      title: 'Inventory Management',
      description: 'Control and organize your inventory efficiently with our intuitive system.',
      color: 'primary'
    },
    {
      icon: 'pi pi-chart-line',
      title: 'Detailed Reports',
      description: 'Get valuable insights with comprehensive reports and inventory analytics.',
      color: 'primary'
    },
    {
      icon: 'pi pi-mobile',
      title: 'Mobile Access',
      description: 'Manage your inventory from any device, anytime, anywhere.',
      color: 'primary'
    },
    {
      icon: 'pi pi-shield',
      title: 'Guaranteed Security',
      description: 'Your data is protected with the highest security standards.',
      color: 'primary'
    }
  ];

  benefits = [
    'Complete inventory control',
    'Low stock alerts',
    'Real-time reports',
    'Intuitive interface',
    '24/7 support',
    'Automatic backup'
  ];

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
