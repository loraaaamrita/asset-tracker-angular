import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { AssetService } from "../../service/asset.service";

@Component({
  selector: 'app-asset-deploy',
  templateUrl: './asset-deploy.component.html',
  styleUrls: ['./asset-deploy.component.scss']
})
export class AssetDeployComponent implements OnInit {

  @Input()  assetId: number;
  @Output() cancelDeploy = new EventEmitter();

  assetAddressForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private assetService: AssetService) { 
      this.assetAddressForm = this.fb.group({
        address: [null, Validators.required]
      });
    }

  ngOnInit() { }

  close() {
    this.cancelDeploy.emit(false);
  }

}
