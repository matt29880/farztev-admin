import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


import {CountriesService} from '../countries.service';
import {Country} from './country';

@Component({
  selector: 'farztev-country',
  templateUrl: 'country.component.html',
  styleUrls: ['country.scss']
})
export class CountryComponent {

  @Input()
  countryId: number;

  country: Country;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.fetchCountry();
  }

  fetchCountry(): void {
    this.countriesService.getCountry(this.countryId).then(country => this.country = country);
  }

}
