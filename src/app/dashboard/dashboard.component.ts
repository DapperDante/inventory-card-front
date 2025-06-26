import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MenubarModule, AvatarModule, AvatarGroupModule, BadgeModule, OverlayBadgeModule, InputText],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {
  items: MenuItem[] | undefined;
  ngOnInit() {
        this.items = [
            {
                label: 'Home',
            },
            {
                label: 'Projects',
            },
        ];
    }
}
