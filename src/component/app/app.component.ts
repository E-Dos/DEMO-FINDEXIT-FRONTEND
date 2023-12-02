import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: NbAuthService,
  ) { }
  authenticated  = false

  ngOnInit(): void {
    this.authService.onAuthenticationChange()
      .subscribe((authenticated: boolean) => {
        if (authenticated) {
          this.authenticated = true
        } else {
          this.authenticated = false
          this.router.navigate(['login']);
        }
      });
  };
}
