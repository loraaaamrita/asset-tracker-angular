import { Component, OnInit, OnChanges, ViewChild, AfterViewInit, Input } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } 
from '@angular/material';

import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';

import { AssetService } from "../../service/asset.service";
import { SecurityService } from "../../service/security.service";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, OnChanges {

  @Input()  assetId: number;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  security: any;
  history: any;
  isLoader: boolean = false;
  dataSource: MatTableDataSource<any>;

  columnsToDisplay: string[] = ['unit_no', 'date', 'user', 'action'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private snackBar: MatSnackBar,
    private assetService: AssetService,
    private securityService: SecurityService) { }

  ngOnChanges() {
    this.assetService.getAssetHistory(this.assetId).subscribe(history => {
      this.history = history;
      this.dataSource = new MatTableDataSource(this.history);    
      });
  }

  ngOnInit() {
    this.securityService.getAssetSecurity().subscribe(security => {
      this.security = security;
    });
    this.getData();
  }

  ngAfterViewInit() {
    merge(this.paginator.page).pipe(
      tap(() => this.loadNextPage())
    ).subscribe();
  }

  getData() {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.assetService!.getHistory(
          this.paginator.pageSize,
          this.paginator.pageIndex
        );
      }),
      map(data => {
        console.log(data)
        this.isLoader = false;
        return data;
      }),
      catchError(() => {
        this.isLoader = false;
        return observableOf([]);
      })
    )
    .subscribe(log => {
      console.log(log)
      this.history = log;
      this.dataSource = this.history;
    });
  }

  loadNextPage() {
    this.isLoader = true;
    this.getData();
  }

}
