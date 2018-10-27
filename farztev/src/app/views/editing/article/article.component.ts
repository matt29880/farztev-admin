import {Component, OnInit} from '@angular/core';
import {ArticlesService} from '../articles.service';
import {Article} from '../article';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'article.component.html'
})
export class ArticleComponent implements OnInit {
  constructor(public articlesService: ArticlesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // The JavaScript (+) operator converts the string to a number
    this.articleId = +this.route.snapshot.paramMap.get('id');
    this.getArticle();
  }

  articleId: number;
  article: Article;

  getArticle(): void {
    this.articlesService.getArticle(this.articleId).subscribe(article => this.article = article);
  }

}
