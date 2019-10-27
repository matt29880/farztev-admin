import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import {Trip} from '../trip/trip';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { Article } from '../article/article';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private tripsUrls = environment.backendBaseUrl + '/api/trip';
  private tripArticlesUrls = environment.backendBaseUrl + '/api/triparticle';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrls).pipe(
      tap(trips => this.log('fetched trips')),
      catchError(this.handleError('getTrips', []))
    );
  }

  getTrip(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.tripsUrls + "/" + id).pipe(
      tap(trip => this.log('fetched trip'))
    );
  }

  insertTrip(trip: Trip): Observable<Trip> {
    console.log("Try to insert trip");
    console.log(trip);
    return this.http.post<Trip>(this.tripsUrls, trip, httpOptions).pipe(
      tap(trip => this.log('inserted trip'))
    );
  }

  updateTrip(id: number, trip: Trip): Observable<void> {
    console.log("Try to update trip - id = "+id);
    console.log(trip);
    return this.http.put<void>(this.tripsUrls + "/" + id, trip, httpOptions).pipe(
      tap(trip => this.log('updated trip'))
    );
  }

  deleteTrip(id: number): Observable<void> {
    console.log("Try to delete the trip - id = "+id);
    return this.http.delete<void>(this.tripsUrls + "/" + id, httpOptions).pipe(
      tap(trip => this.log('deleted trip'))
    );
  }

  getTripArticles(tripId : number): Observable<Article[]> {
    return this.http.get<Article[]>(this.tripArticlesUrls + "/" + tripId).pipe(
      tap(articles => this.log('fetched articles of trip ' + tripId)),
      catchError(this.handleError('getTripArticles', []))
    );
  }

  addTripArticle(tripId : number, articleId : number): Observable<Object> {
    console.log("2 - addTripArticle " + articleId);
    /*return this.http.post<Article[]>(this.tripArticlesUrls + "/" + tripId + "/" + articleId, httpOptions).pipe(
      tap(articles => this.log('add article '+ articleId + ' to trip ' + tripId)),
      catchError(this.handleError('addTripArticle', []))
    );*/
    return this.http.post(this.tripArticlesUrls + "/" + tripId + "/" + articleId, null).pipe(
      tap(res => res)
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  }

}