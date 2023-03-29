import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://movie-api-m3ac.onrender.com/';
@Injectable({
  providedIn: 'root',
})

export class FetchApiDataService {
  /**
   * @param http HttpClient
   * @private available via this.http inside the class
   */
  constructor(private http: HttpClient) {}

  /* Observable<any> shows the type of function return, considered as enhanced promise, as it allows you to process events asynchronously.*/

  /**
   * This function makes an API call to user registration endpoind on back end
   * @function userRegistration
   * @service POST to the API endpoint `https://movie-api-zhikiki.herokuapp.com/users`
   * @param userDetails Username (required), Password (required), Email (required), Birthday
   * @returns A JSON object holding data about the added user
   * @public can be used in all components of the app
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    // apiUrl + 'users' - API endpoint
    // Using this.http, it posts it to the API endpoint and returns the API's response
    return (
      this.http
        .post(apiUrl + 'users', userDetails)
        // .pipe() (from RxJS) is used to combine multiple functions into a single function.
        .pipe(catchError(this.handleError))
    );
  }

  /**
   * This function makes an API call to user login endpoind on back end
   * @function userLogin
   * @service POST to the API endpoint https://movie-api-zhikiki.herokuapp.com/login?Username={Username}&Password={Password}
   * @param userDetails Username, Password
   * @returns A JSON object holding data about the logged user with token
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * This function makes an API call to get full list of movies from database
   * @function getAllMovies
   * @service GET to the API endpoint https://movie-api-zhikiki.herokuapp.com/movies
   * @returns an array with all movies in JSON format or error
   * @token should be extracted from local storage (User should be logged in)
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function makes an API call to get the single movie by its title
   * @function getMovie
   * @servise GET to the API endpoint
   * @param title movie title to be added to apiUrl https://movie-api-zhikiki.herokuapp.com/movies/{Title}
   * @returns A JSON object holding data about the single movie
   * @token should be extracted from local storage (User should be logged in)
   */
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function makes an API call to get the info about specific Director
   * @function getDirector
   * @servise GET to the API endpoint https://movie-api-zhikiki.herokuapp.com/movies/directors/{directorName}
   * @param directorName to be added to apiUrl
   * @returns A JSON object holding data about the specific Director
   * @token should be extracted from local storage (User should be logged in)
   */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function makes an API call to get the info about specific Genre
   * @function getGenre
   * @servise GET to the API endpoint https://movie-api-zhikiki.herokuapp.com/movies/genre/{genreName}
   * @param genreName to be added to apiUrl
   * @returns A JSON object holding data about the specific Genre
   * @token should be extracted from local storage (User should be logged in)
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function makes an API call to get the info about specific User
   * @function getUser
   * @servise GET to the API endpoint https://movie-api-zhikiki.herokuapp.com/users/{Username}
   * @returns A JSON object holding data about the specific User
   * @token should be extracted from local storage (User should be logged in)
   * @username should be extracted from local storage (User should be logged in)
   */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function makes an API call to get the list of favorite movies for specific User
   * @function getFavoriteMovies
   * @servise GET to the API endpoint https://movie-api-zhikiki.herokuapp.com/users/{Username}
   * @returns an array with id of all favorite movies in JSON format or error
   * @token should be extracted from local storage (User should be logged in)
   * @username should be extracted from local storage (User should be logged in)
   */
  public getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * This function makes an API call to add specific movie to the user's favorits list
   * @function getFavoriteMovies
   * @servise POST to the API endpoint https://movie-api-zhikiki.herokuapp.com/users/{Username}/movies/{movieId}
   * @param movieId to be added to apiUrl
   * @returns A JSON object holding data about the specific User
   * @token should be extracted from local storage (User should be logged in)
   * @username should be extracted from local storage (User should be logged in)
   */
  public addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .post(
        `${apiUrl}users/${username}/movies/${movieId}`,
        { FavoriteMovie: movieId },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /** This function makes an API call to delete specific movie from the user's favorits list
   * @function deleteFavoriteMovies
   * @servise DELETE to the API endpoint https://movie-api-zhikiki.herokuapp.com/users/{Username}/movies/{movieId}
   * @param movieId to be added to apiUrl
   * @returns A JSON object holding data about the specific User
   * @token should be extracted from local storage (User should be logged in)
   * @username should be extracted from local storage (User should be logged in)
   */
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function makes an API call to update existing user data
   * @function updateUser
   * @servise PUT to the API endpoint https://movie-api-zhikiki.herokuapp.com/users/{Username}
   * @param updateUserInfo Username, Password, Email, Birthday
   * @returns A JSON object holding data about the specific User
   * @token should be extracted from local storage (User should be logged in)
   * @username should be extracted from local storage (User should be logged in)
   */
  public updateUser(updateUserInfo: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .put(`${apiUrl}users/${username}`, updateUserInfo, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function makes an API call to delete user data from database
   * @function deleteUser
   * @servise DELETE to the API endpoint  https://movie-api-zhikiki.herokuapp.com/users/{Username}
   * @returns  A massege that user was deleted
   * @token should be extracted from local storage (User should be logged in)
   * @username should be extracted from local storage (User should be logged in)
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //
  /**
   * This function extracts Non-typed response data from API calls to be used in return of methods in this class
   * @param res from API call
   * @returns body of response or JSON object
   * @private is used only incide service
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * This function handls errors from API calls
   * @param error from API call if appeared
   * @returns message "Something bad happened; please try again later."
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
