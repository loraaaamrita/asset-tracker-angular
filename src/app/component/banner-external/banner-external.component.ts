import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-external',
  templateUrl: './banner-external.component.html',
  styleUrls: ['./banner-external.component.scss']
})
export class BannerExternalComponent {

  constructor(
    private router: Router) { }

  login() {
    this.router.navigate(['/login']);
  }
  
  register() {
    this.router.navigate(['/register']);
  }

}
