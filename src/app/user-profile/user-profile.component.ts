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
  /**
   * This variables will receive and keep info from API calls bellow
   * @user - keeps info about specific user
   * @movies - keeps array of JSON objects (all movie avaliable in database)
   * @favorites - keeps array of favorite movies of specific user
   */
  user: any = {};
  movies: any[] = [];
  favorites: any[] = [];

  /**
   * The updatedUser object will then be passed into the API call in the registerUser function.
   * @userData object contains: @Username (required), @Password (required), @Email (required), @Birthday (optional)
   */
  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * Constructor arguments then will be avaliable through "this" method
   * @param fetchApiData to use functions to make API call
   * @param router to navigate the user to welcome screen after deleting account
   * @param snackBar to show the message, that user has successfuly loged in
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * This function makes an API call to get User info from database
   * @function getUser
   * @returns JSON object with user information
   */
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

  /**
   * This function makes an API call to delete user data for the user that is logged in, redirects user to the welcome view
   * @function deleteUser
   */
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
        localStorage.clear();
      });
    }
  }

  /**
   * This function makes an API call to update user data, such as username, password, email, or birthday
   * @function updateUserInfo
   */
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
