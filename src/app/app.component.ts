import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NbAuthComponent, NbAuthService } from '@nebular/auth';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { RoleProvider } from 'src/component/services/role.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
constructor(
  private router: Router,
  private authService: NbAuthService,
  private roleService: RoleProvider
){}
authentificated = false
userRoles: string[] = [];

  ngOnInit(): void {
    this.authService.onAuthenticationChange()
    .subscribe((authenticated: boolean) => {
      if (authenticated) {
        this.authentificated = true
      } else {
        this.authentificated = false
        this.router.navigate(['login']);
      }
    });
   this.roleService.getRole().subscribe(data=> {
    this.userRoles.push(data)
   })
  };

  title = 'sapa-meteor-front';
  profileItems: NbMenuItem[] = [
    {
      title: `Выйти из системы`,
      icon: { icon: 'unlock-outline', pack: 'eva' },
      link: 'logout'
    }]

}
