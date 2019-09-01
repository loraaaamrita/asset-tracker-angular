import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { AssetService } from "../../service/asset.service";
import { GeocodeService } from "../../service/geocode.service";

import { CONSTANTS } from "../../model/constants";
import { StateGroup } from "../../model/provinceState";
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-asset-deploy',
  templateUrl: './asset-deploy.component.html',
  styleUrls: ['./asset-deploy.component.scss']
})
export class AssetDeployComponent implements OnInit {

  @Input()  assetId: number;
  @Output() cancelDeploy = new EventEmitter();
  @Output() refreshMarkers = new EventEmitter();

  location: any;
  isFound: boolean = false;
  // isLookup: boolean = false;
  lookupString: string = '';

  stateGroups: StateGroup[] = CONSTANTS.StateProvinces

  assetAddressForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private assetService: AssetService,
    private geocodeService: GeocodeService) { 
      this.assetAddressForm = this.fb.group({
        address:  [null],
        city:     [null],
        province: [null],
        postal:   [null],
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
    this.geocodeService.getAddress(address).subscribe(location => {
      this.location = location;
      if (this.location.lat !== 0) {
        this.isFound = true;
        alert('The address is found at latitude '+this.location.lat+', longitude '+this.location.lng)
      }
      else
        alert('The address is NOT found')
    });
  }

  addToMap() {
    let obj = {
      id:  this.assetId,
      lat: this.location.lat,
      lng: this.location.lng
    }
    this.assetService.addToMap(obj).subscribe(response => {
      console.log(response)
      this.refreshMarkers.emit();
      // window.location.reload();
      // this.snackBar.open('Asset updated.', "Success:", {duration: 5000});
    });

  }

}
