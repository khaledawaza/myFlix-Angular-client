import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = {
    Username: '',
    Password: '',
  };
  constructor(
    public FetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
  ngOnInit(): void {}
  loginUser(): void {
    this.FetchApiData.userLogin(this.loginData).subscribe({
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
