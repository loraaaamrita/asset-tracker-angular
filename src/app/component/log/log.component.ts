import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } 
from '@angular/material';

import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';

import { AssetService } from "../../service/asset.service";
import { SecurityService } from "../../service/security.service";

import { IAssetSecurity } from 'src/app/model/asset-security';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  security: any;
  history: any;
  dataSource: MatTableDataSource<any>;

  columnsToDisplay: string[] = ['unit_number', 'move_date', 'move_user_label', 'status_label'];

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
  }

  ngAfterViewInit() {
    merge(this.paginator.page).pipe(
      tap(() => this.loadNextPage())
    ).subscribe();
    this.getData();
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
        return data;
      }),
      catchError((err) => {
        return observableOf([]);
      })
    )
    .subscribe(history => {
      this.history = history;
      this.dataSource = this.history;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadNextPage() {
    this.getData();
  }

}
