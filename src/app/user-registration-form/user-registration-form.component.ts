import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})

export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  // constructor is used to set dependencies. Constructor arguments then will be avaliable through "this" method
  constructor(
    public FetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}
  registerUser(): void {
    this.FetchApiData.userRegistration(this.userData).subscribe({
      // if success, open snackBar to inform and close the login dialog,
      next: (result) => {
        this.dialogRef.close(); // this will close the modal on success
        console.log(result);
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 4000,
        });
      },
      error: (result) => {
        this.snackBar.open(result, 'OK', { duration: 4000 });
        console.log(result);
      }
    }
      
    );
  }
}
