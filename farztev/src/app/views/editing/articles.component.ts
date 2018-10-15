import { Component } from '@angular/core';
import { ListArticle } from './listarticle';
import { LISTARTICLE } from './mock-listarticle';

@Component({
  templateUrl: 'articles.component.html'
})
export class ArticlesComponent {

  constructor() { }
  
  listarticle = LISTARTICLE;

}
