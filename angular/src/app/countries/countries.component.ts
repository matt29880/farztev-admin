import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { CountriesService } from './countries.service';
import { ListCountry } from './listcountry';
import { CountryComponent } from './country/country.component';

@Component({
  templateUrl: 'countries.component.html',
  styleUrls: ['countries.scss']
})
export class CountriesComponent {

  countries: ListCountry[];
  singleView: boolean;
  countryId: number;

  constructor(private countriesService: CountriesService) {
    this.singleView = false;
  }


  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countriesService.getCountries().then(countries =>  this.countries = countries);
  }

}
