import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { AssetService } from "../../service/asset.service";
import { GeocodeService } from "../../service/geocode.service";

import { CONSTANTS } from "../../model/constants";
import { StateGroup } from "../../model/ProvinceState";


@Component({
  selector: 'app-asset-deploy',
  templateUrl: './asset-deploy.component.html',
  styleUrls: ['./asset-deploy.component.scss']
})
export class AssetDeployComponent implements OnInit {

  @Input()  assetId: number;
  @Output() cancelDeploy = new EventEmitter();

  location;

  stateGroups: StateGroup[] = CONSTANTS.StateProvinces

  assetAddressForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private geocodeService: GeocodeService) { 
      this.assetAddressForm = this.fb.group({
        address:  [null, Validators.compose([Validators.required])],
        city:     [null, Validators.compose([Validators.required])],
        province: [null, Validators.compose([Validators.required])],
        postal:   [null, Validators.compose([Validators.required])],
      });
    }

  ngOnInit() { 
    console.log(this.assetId)
  }

  close() {
    this.cancelDeploy.emit(false);
  }

  lookup() {
    let obj = { 
      address:  this.assetAddressForm.value.address, 
      city:     this.assetAddressForm.value.city,
      province: this.assetAddressForm.value.province,
      postal:   this.assetAddressForm.value.postal,
    }
    let address = JSON.stringify(obj);
    console.log(address)
    this.geocodeService.getAddress(address)
        .subscribe((location) => {
      this.location = location;
      console.log(this.location)
      if (this.location.length === 0)
        this.assetAddressForm.patchValue({address: 'Location Not Found'});
      else
        this.addToMap(this.location)
    });
  }

  addToMap(location) {
    let obj = {
      id:  this.assetId,
      lat: location.lat,
      lng: location.lng
    }
    this.assetService.addToMap(obj).subscribe(response => {
      console.log(response)
      // this.snackBar.open('Asset updated.', "Success:", {duration: 5000});
    });

  }

}
