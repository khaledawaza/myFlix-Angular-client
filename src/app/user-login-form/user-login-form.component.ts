import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  // The userData object will then be passed into the API call in the userLogin function.
  @Input() loginData = {
    Username: '',
    Password: '',
  };

  // constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
  constructor(
    public FetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  // The ngOnInit method is called once the component has received all its inputs
  // (all its data-bound properties) from the calling component (user)
  ngOnInit(): void {}

  // This function is responsible for sending the form to the backend
  // Function for sending the form inputs to the backend to login user
  // If success, set the localstorage with user and token
  // if fails, snakBar shows error message

  loginUser(): void {
    this.FetchApiData.userLogin(this.loginData).subscribe({
      // if success, localStorage setItem token and user
      // open snackBar to inform and close the login dialog
      next: (result) => {
        localStorage.setItem('username', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // this will close the modal on success
        // information message about successfull login
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
