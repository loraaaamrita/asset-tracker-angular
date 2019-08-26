import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';

import { MatTableDataSource, MatSort, MatPaginator } 
from '@angular/material';

import { AssetService } from "../../service/asset.service";

@Component({
  selector: 'app-asset-yard',
  templateUrl: './asset-yard.component.html',
  styleUrls: ['./asset-yard.component.scss']
})
export class AssetYardComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @Output() cancelYard = new EventEmitter();
  @Input()  yardId: number;
  @Input()  yardName: string;

  isDeploy: boolean = false;
  assetId: number;
  assets: any;

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['name', 'unit_number', 'status', 'deploy'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private assetService: AssetService
  ) { }

  ngOnInit() {
    this.assetService.getYardAssets(this.yardId).subscribe(assets => {
      this.assets = assets;
      this.dataSource = new MatTableDataSource(this.assets);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  close() {
    this.cancelYard.emit(false);
  }

  deploy() {
    console.log('got here')
    this.isDeploy = true;
  }

  cancelDeploy() {
    this.isDeploy = false;
  }

}
