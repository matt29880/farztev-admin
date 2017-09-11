import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CountriesComponent } from './countries.component';
import { CountryComponent } from './country/country.component';
import { CountriesRoutingModule } from './countries-routing.module';

@NgModule({
  imports: [
    CountriesRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ CountriesComponent, CountryComponent ]
})
export class CountriesModule { }
