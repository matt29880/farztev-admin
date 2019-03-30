import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: 'articles',
        component: ArticlesComponent,
        data: {
          title: 'Articles'
        }
      },
      {
        path: 'articles/:id',
        component: ArticleComponent,
        data: {
          title: 'Article'
        }
      },
      {
        path: 'articles/new',
        component: ArticleComponent,
        data: {
          title: 'Article'
        }
      },
      {
        path: 'countries',
        component: CountriesComponent,
        data: {
          title: 'Countries'
        }
      },
      {
        path: 'countries/:id',
        component: CountryComponent,
        data: {
          title: 'Country'
        }
      },
      {
        path: 'countries/new',
        component: CountryComponent,
        data: {
          title: 'Country'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditingRoutingModule {}
