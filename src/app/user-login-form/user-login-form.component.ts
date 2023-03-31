import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/** @Component decorator to tell Angular that the class right below is a component.*/ 
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})

export class UserLoginFormComponent implements OnInit {
  // The userData object will then be passed into the API call in the userLogin function.
  /**
   * The @loginData object will then be passed into the API call in the registerUser function.
   * @loginrData object contains: @Username (required), @Password (required)
   */
  @Input() loginData = {
    Username: '',
    Password: '',
  };
   /**
   * @constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
   * @param dialogRef to call dialog with login inputs
   * @param FetchApiData to use functions to make API call
   * @param router to navigate the user to welcome MovieCard after logging in
   * @param snackBar to show the message, that user has successfuly loged in
   */

  constructor(
    public FetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
   /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {}

  /**
   * This is the function responsible for sending the form inputs to the backend API to login user
   * @function registerUser
   * If success, set the localstorage with user and token
   * if fails, snakBar shows error message
   */

  loginUser(): void {
    this.FetchApiData.userLogin(this.loginData).subscribe({
      // if success, localStorage setItem token and user
      // open snackBar to inform and close the login dialog
      next: (result) => {
        localStorage.setItem('username', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); 
        this.snackBar.open('User logged in successfully!', 'OK', {
          duration: 4000,
        });
        this.router.navigate(['movies']);
      },
      error: (result) => {
        this.snackBar.open(result, 'OK', { duration: 4000 });
        console.log(result);
      },
    });
  }
}
