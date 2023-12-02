import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbTokenStorage } from '@nebular/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router,
    private tokenStorage: NbTokenStorage) {
  }

  logout() {
    this.tokenStorage.clear();
    this.router.navigate(['login']);
    window.location.reload()
  }
}
