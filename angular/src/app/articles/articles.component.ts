import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { ArticlesService } from './articles.service';
import { ListArticle } from './listarticle';
import { ArticleComponent } from './article/article.component';

@Component({
  templateUrl: 'articles.component.html',
  styleUrls: ['articles.scss']
})
export class ArticlesComponent {

  articles: ListArticle[];
  singleView: boolean;
  articleId: number;

  constructor(private articlesService: ArticlesService) {
    this.singleView = false;
  }


  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.articlesService.getArticles().then(articles =>  this.articles = articles);
  }

}
