import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken, NbAuthToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthToken) => {
          return token.isValid() ? token.getPayload()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : 'guest';
        }),
      );
  }
}
