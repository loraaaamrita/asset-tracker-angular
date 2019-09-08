import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';

import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";
import { MediaService } from "../../service/media.service";

import { environment } from '../../../environments/environment';

import { IMediaSecurity } from 'src/app/model/media-security';
import { ICategories } from 'src/app/model/categories';

@Component({
  selector: 'app-media-library',
  templateUrl: './media-library.component.html',
  styleUrls: ['./media-library.component.scss']
})
export class MediaLibraryComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  baseUrl = environment.baseUrl;
  tenant_id = sessionStorage.getItem('tenantId');
  user_id = sessionStorage.getItem('userId');

  isCreate:   boolean = false;
  isUpdate:   boolean = false;
  isDelete:   boolean = false;
  isDisabled: boolean = false;

  media: any;
  fileArray = [];
  security: any;
  categories: any;
  isNewMedia: boolean = false;
  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private snackBar: MatSnackBar,
    private mediaService: MediaService,
    private settingService: SettingService,
    private securityService: SecurityService) { 
  }

  ngOnInit() {
    this.securityService.getMediaSecurity().subscribe((security: IMediaSecurity) => {
      this.security = security;
      if (this.security.media_create === true)
        this.isCreate = true;
      if (this.security.media_update === true)
        this.isUpdate = true;
      if (this.security.media_delete === true)
        this.isDelete = true;
      if (this.security.media_create === false
          && this.security.media_update === false
          && this.security.media_delete == false) 
        this.isDisabled = true;     
    });
    this.settingService.getCategories().subscribe((response: ICategories) => {
      this.categories = response;
    });
    this.getMedia();
  }

  onFilesAdded(files: File[]) {
    files.forEach(file => {
      var file_name = file.name;
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        this.fileArray.push({
          file_name: file_name,
          content: content,
          user_id: this.user_id
        });
      };
      reader.readAsDataURL(file);
    });
  }
  
  onFilesRejected(files: File[]) {
    this.snackBar.open('Your file is too big, must be 20k or less.', "Error:", {duration: 5000})
  }

  getMedia() {
    this.mediaService.getMedia().subscribe(response => {
      this.media = response;
      this.media.forEach(element => {
        let thumb = element.file_name.replace(/\.[^/.]+$/, "")
        let extension = element.file_name.split('.').pop();
        element.thumb = thumb+'_thumb.'+extension;
      })
      if (this.security.media_delete === false
          && this.security.media_update === false
          && this.security.media_delete == false)
        this.columnsToDisplay = ['thumbnail', 'file', 'description', 'category', 
                                'date_created'];
      else
        this.columnsToDisplay = ['thumbnail', 'file', 'description', 'category', 
                                'date_created', 'delete', 'update'];
      this.dataSource = new MatTableDataSource(this.media);
      this.dataSource.sort = this.sort;
    });
  }

  create() {
    this.fileArray.forEach(element => {
      this.mediaService.createMedia(element).subscribe(response => {
        this.close();
        this.getMedia();
      });
    });
  }

  update(element) {
    this.mediaService.updateMedia(element).subscribe(response => {
      this.snackBar.open('Update complete.', "Success:", {duration: 5000});
    });
  }

  delete(element) {
    let obj = {id: element.id, user_id: this.user_id};
    this.mediaService.deleteMedia(obj).subscribe(response => {
      this.snackBar.open('File deleted.', "Success:", {duration: 5000});
      this.getMedia();
    });
  }

  newMedia() {
    this.isNewMedia = true;
  }

  close() {
    this.isNewMedia = false;
  }

}

