import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public router: Router) {}
  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {}

  allMovies(): void {
    this.router.navigate(['movies']);
  }
 /**
   * This function navigates to user profile page, URL ends with 'profile'
   * @function userProfile
   */
  userProfile(): void {
    this.router.navigate(['profile']);
  }
/**
   * This function navigates to welcome page, URL ends with 'welcome'
   * @function logout
   */
  logout(): void {
    this.router.navigate(['welcome']);
  }
}
