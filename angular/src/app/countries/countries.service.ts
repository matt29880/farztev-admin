import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {ListCountry} from './listcountry';
import {Country} from './country/country';
import {environment} from '~/../environments/environment';

@Injectable()
export class CountriesService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private countriesUrl = `${environment.backendUrl}/countries`;  // URL to web api
  constructor(private http: Http) {}

  getCountries(): Promise<ListCountry[]> {
    return this.http.get(this.countriesUrl)
      .toPromise()
      .then(response => {
        return response.json() as ListCountry[];
      })
      .catch(this.handleError);
  }


  getCountry(countryId: number): Promise<Country> {
    return this.http.get(this.countriesUrl + '/' + countryId)
      .toPromise()
      .then(response => {
        return response.json() as Country;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
