import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-topbar',
  imports: [
    MenubarModule,
    BadgeModule,
    CommonModule,
    AvatarModule,
    InputTextModule,
    MenuModule,
  ],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(Router);
  itemsTopbar: MenuItem[] | undefined;
  itemsAvatar: MenuItem[] | undefined;
  ngOnInit() {
    this.itemsTopbar = [
      {
        label: 'Home',
        command: () => {
          this.route.navigate(['/']);
        },
        styleClass: 'bg-primary border-round',
      },
      // {
      //   label: 'Projects',
      // },
    ];
    this.itemsAvatar = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
          // this.route.navigate(['/profile']);
        },
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
          // this.route.navigate(['/settings']);
        },
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
          this.route.navigate(['/login']);
        },
      },
    ];
  }
}
