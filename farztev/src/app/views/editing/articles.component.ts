import {Component, OnInit} from '@angular/core';
import {ListArticle} from './listarticle';
import {ArticlesService} from './articles.service';
import {CountriesService} from './countries.service';

@Component({
  templateUrl: 'articles.component.html'
})
export class ArticlesComponent implements OnInit {
  constructor(public articlesService: ArticlesService, public countriesService: CountriesService) {
  }

  ngOnInit() {
    this.getArticles();
  }

  listarticle: ListArticle[];

  getArticles(): void {
    this.articlesService.getArticles().subscribe(listarticle => this.listarticle = listarticle);
  }

}
