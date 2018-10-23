import {Component, OnInit} from '@angular/core';
import {ListArticle} from './listarticle';
import {ArticlesService} from './articles.service';

@Component({
  templateUrl: 'articles.component.html'
})
export class ArticlesComponent implements OnInit {
  constructor(public articlesService: ArticlesService) {
  }

  ngOnInit() {
    this.getArticles();
  }
  
  listarticle: ListArticle[];

  getArticles(): void {
     this.articlesService.getArticles().subscribe(listarticle => this.listarticle = listarticle);
  }

}
