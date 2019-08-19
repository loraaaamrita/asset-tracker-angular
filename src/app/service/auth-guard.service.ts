import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } 
from '@angular/router';
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
  currentSession: any;
  constructor(
    private router: Router,
    // private amplifyService: AmplifyService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  //   return this.amplifyService.auth().currentSession().then(session => {
  //     if (session)
  //       return true;
  //     else
  //       return false;
  //   })
  }
  
}