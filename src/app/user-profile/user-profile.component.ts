import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  // we declare variable as an object of type any
  // this variable will keep user info from API call (look getUser())
  user: any = {};
  movies: any[] = [];
  favorites: any[] = [];
  
  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      // we set user variable to keep what we get as a response from API call
      this.user = resp;
      // console.log(resp);
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = this.user.Birthday;
      return this.user;
    });
  }

  deleteUser(): void {
    if (
      confirm(
        'You are going to delete your account FOREVER. All data will be lost. Are you sure?'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account - we are sorry to see you go!',
          'OK',
          {
            duration: 4000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

  updateUserData(): void {
    this.fetchApiData.updateUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open('User profile was successfuly updated', 'OK', {
        duration: 4000,
      });
      localStorage.setItem('username', result.Username);
      window.location.reload();
    });
  }
}
