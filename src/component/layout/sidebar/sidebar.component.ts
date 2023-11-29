import { Component, NgModule } from '@angular/core';
import { NbMenuItem, NbMenuModule } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  items: NbMenuItem[] = [
    {
      title: 'Profile',
      icon: 'person-outline',
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
    },

  ];
}
