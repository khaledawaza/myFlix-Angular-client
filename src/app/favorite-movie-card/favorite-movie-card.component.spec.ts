import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMovieCardComponent } from './favorite-movie-card.component';

describe('FavoriteMovieCardComponent', () => {
  let component: FavoriteMovieCardComponent;
  let fixture: ComponentFixture<FavoriteMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteMovieCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
