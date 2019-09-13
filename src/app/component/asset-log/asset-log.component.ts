import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } 
from '@angular/material';

import { AssetService } from "../../service/asset.service";
import { SecurityService } from "../../service/security.service";

import { IAssetLog } from "../../model/asset";
import { IAssetSecurity } from "../../model/security";

@Component({
  selector: 'app-asset-log',
  templateUrl: './asset-log.component.html',
  styleUrls: ['./asset-log.component.scss']
})
export class AssetLogComponent implements OnInit {

  @Input() assetId: number;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  security: IAssetSecurity;
  history: any;
  isLoader: boolean = false;
  dataSource: MatTableDataSource<any>;

  columnsToDisplay: string[] = ['unit_number', 'date', 'user', 'action'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private snackBar: MatSnackBar,
    private assetService: AssetService,
    private securityService: SecurityService) { }

  ngOnInit() {
    this.securityService.getAssetSecurity().subscribe((security: IAssetSecurity) => {
      this.security = security;
    });
    this.assetService.getAssetHistory(this.assetId).subscribe((history: IAssetLog) => {
      this.history = history;
      this.dataSource = new MatTableDataSource(this.history);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
