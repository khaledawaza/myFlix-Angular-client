import { Component } from '@angular/core';

import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

import { MatDialog } from '@angular/material/dialog';

/** @Component decorator to tell Angular that the class right below is a component.*/ 
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  title = 'myFlix-Angular-client';

 
  /**
   * Conctructor makes MatDialog available via this.dialog inside the class
   * @param dialog
   */
  constructor(public dialog: MatDialog) {}

  /**
   * This is the function that will open the dialog when the signup button is clicked
   * @function openUserRegistrationDialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

  //
  /**
   * This is the function that will open the dialog when the Login button is clicked
   * @function openUserLoginDialog
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }
}

// npx typedoc --out docs src/app/welcome-page/welcome-page.component.ts src/app/fetch-api-data.service.ts