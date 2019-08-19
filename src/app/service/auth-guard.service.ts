import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } 
from '@angular/router';

// import { AmplifyService } from 'aws-amplify-angular';
 
// @Injectable()
// export class AuthGuardService implements CanActivate {
 
//   currentSession: any;
//   constructor(
//     private router: Router,
//     // private amplifyService: AmplifyService
//   ) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.amplifyService.auth().currentSession().then(session => {
//       if (session)
//         return true;
//       else
//         return false;
//     })
//   }
  
// }