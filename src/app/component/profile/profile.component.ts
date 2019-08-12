import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatDialogRef, MatSnackBar } from '@angular/material';

import { UserService } from "../../service/user.service";
import { MediaService } from "../../service/media.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  baseUrl = environment.baseUrl;
  tenant_id = localStorage.getItem('tenantId');

  user: any;
  profileFile: any;
  profileImage: string;
  profile_image: string;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private mediaService: MediaService,
    public dialogRef: MatDialogRef<ProfileComponent>) { 
      this.profileForm = this.fb.group({
        first_name: [null],
        last_name:  [null],
        email:      [null]
      })
    }

  ngOnInit() {
    this.userService.getUserEmail().subscribe(user => {
      this.user = user;
      this.profileImage = this.baseUrl+'profiles/'+
                          this.tenant_id+'/'+
                          this.user.profile_image;
                          console.log(this.profileImage)
      this.profileForm.patchValue({
        first_name: this.user.first_name,
        last_name:  this.user.last_name,
        email:      this.user.email
      })
    });
  }

  onFilesAdded(files: File[]) {
    files.forEach(file => {
      var file_name = file.name;
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
  
        this.profileFile = {
          id: this.user.id,
          file_name: file_name,
          content: content
        }
      };
      reader.readAsDataURL(file);       
    });
  }
  
  onFilesRejected(files: File[]) {
    this.snackBar.open('Your file is too big, must be 20k or less.', "Error:", {duration: 5000})
  }

  saveProfileImage() {
    this.mediaService.saveProfileImage(this.profileFile).subscribe(response => {
      this.snackBar.open('Profile image uploaded', "Success:", {duration: 5000});
    });
  }

  update() {
    this.userService.updateProfile(this.profileForm.value).subscribe(response => {
      this.snackBar.open('Update complete.', "Success:", {duration: 5000});
    });
  }

}


