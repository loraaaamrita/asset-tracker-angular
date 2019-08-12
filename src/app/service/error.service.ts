import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  popSnackbar(errorCode): any {
    this.snackBar.open(errorCode.reason, "Error:", {duration: 5000})
  }
}
