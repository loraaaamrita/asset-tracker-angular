import { Injectable } from '@angular/core';
import { Router, CanActivate } 
from '@angular/router';

import { AuthService } from "./auth.service";
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
  currentSession: string = sessionStorage.getItem('braToken');

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): boolean {
      if (this.currentSession)
        return true;
      else
        return false;
  }
  
}