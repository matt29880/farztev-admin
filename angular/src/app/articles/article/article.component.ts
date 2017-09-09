import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


import {ArticlesService} from '../articles.service';
import {Article} from './article';

@Component({
  selector: 'farztev-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.scss']
})
export class ArticleComponent {

  @Input()
  articleId: number;

  article: Article;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.fetchArticle();
  }

  fetchArticle(): void {
    this.articlesService.getArticle(this.articleId).then(article => this.article = article);
  }

}
