import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorite-movie-card',
  templateUrl: './favorite-movie-card.component.html',
  styleUrls: ['./favorite-movie-card.component.scss'],
})
export class FavoriteMovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  listOfFavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
    this.getListOfFavorite();
  }

  /**
   * Get the list of all favorite movies 
   */
  async getListOfFavorite() {
    let allMovies = await this.getMovies();
    let favoriteMoviesID = await this.getFavoriteMovies()
    console.log(allMovies);
    console.log(favoriteMoviesID);
  }

  /**
   * Get the list of all movies in the DB
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);

      return this.movies;
    });
  }

  /**
   * Get the list of user's favorite movies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * Add a movie to favorites using movie id
   * @param id unique movie id
   */
  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Remove movie from favorites movie array  
   * @param id movie unique id
   */
  deleteFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie deleted from favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

/**
 * Toggle selected movie genre
 * @param name name
 * @param description description
 */
  openGenreDetails(name: string, description: string): void {
    console.log(name);
    this.dialog.open(GenreDetailsComponent, {
      data: {
        Name: name,
        Description: description,
      },
    });
  }

  /**
   * Function to show details of a director for the current movie
   * @param name director name
   * @param bio director bio
   * @param birth date of birth
   */
  openDirectorDetails(name: string, bio: string, birth: string): void {
    console.log(name);
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
    });
  }

  /**
   * Function to toggle movie synopsis
   * @param title Title of the movei
   * @param movieDirector Movie director
   * @param movieGenre movie genre
   * @param movieDescription movie description
   * 
   * @param movieImagePath image path
   */
  openMovieSynopsis(
    title: string,
    movieDirector: string,
    movieGenre: string,
    movieDescription: string,
    movieImagePath: string
  ): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Title: title,
        Director: movieDirector,
        Genre: movieGenre,
        Description: movieDescription,
        Image: movieImagePath,
      },
    });
  }
}
