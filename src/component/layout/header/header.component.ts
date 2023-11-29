import { Component } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user = {};

  constructor(private sidebarService: NbSidebarService,
    private authService: NbAuthService) {
      this.authService.onTokenChange()
      .subscribe(token => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });
  }


  toggleSidebar() {
    this.sidebarService.toggle(true, 'left');
  }

  profileItems: NbMenuItem[] = [
    {
      title: `Выйти из системы`,
      icon: { icon: 'unlock-outline', pack: 'eva' },
      link: 'logout'
    }]
}
