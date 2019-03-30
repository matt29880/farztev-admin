// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';

import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';


// Components Routing
import { EditingRoutingModule } from './editing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EditingRoutingModule
  ],
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    CountriesComponent,
    CountryComponent
  ]
})
export class EditingModule { }
