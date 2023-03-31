import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';


/** @Component decorator to tell Angular that the class right below is a component.*/ 
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * The @userData object will then be passed into the API call in the registerUser function.
   * @userData object contains: @Username (required), @Password (required), @Email (required), @Birthday
   */
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * Constructor arguments then will be avaliable through "this" method
   * @param FetchApiData to use functions to make API call
   * @param dialogRef to call dialog with login inputs
   * @param snackBar to show the message, that user has successfuly loged in
   */
  constructor(
    public FetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // The ngOnInit method is called once the component has received all its inputs
  // (all its data-bound properties) from the calling component (user)
  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {}

  //
  /**
   * This is the function responsible for sending the form inputs to the backend API
   * @function registerUser
   */
  registerUser(): void {
    this.FetchApiData.userRegistration(this.userData).subscribe({
      // if success, open snackBar to inform and close the login dialog,
      next: (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // this will close the modal on success
        console.log(result);
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 4000,
        });
      },
      // if fail, open snackBar to show error message
      error: (result) => {
        this.snackBar.open(result, 'OK', { duration: 4000 });
        console.log(result);
      },
    });
  }
}
