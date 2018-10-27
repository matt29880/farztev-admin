import {Component, OnInit} from '@angular/core';
import {ArticlesService} from '../articles.service';
import {CountriesService} from '../countries.service';
import {Article} from '../article';
import {ListCountry} from '../listcountry';
import {ArticleDescription} from './articleDescription';
import {ArticleParagraph} from './articleParagraph';
import {ArticleTitle} from './articleTitle';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'article.component.html'
})
export class ArticleComponent implements OnInit {

  constructor(public articlesService: ArticlesService, public countriesService: CountriesService, private route: ActivatedRoute) {
  }
  dataAvailable = false;
  articleId: number;
  article: Article;
  descriptionItems: ArticleDescription[];
  countries: ListCountry[];

  ngOnInit() {
    this.getCountries().subscribe(countries => {
      this.countries = countries;

      // The JavaScript (+) operator converts the string to a number
      this.articleId = +this.route.snapshot.paramMap.get('id');
      if (this.articleId != null) {
        this.getArticle().subscribe(article => {this.article = article; this.descriptionItems = JSON.parse(this.article.description); this.dataAvailable = true;});
      }
    });
  }

  getCountries(): Observable<ListCountry[]> {
    return this.countriesService.getCountries();
  }
  getArticle(): Observable<Article> {
    return this.articlesService.getArticle(this.articleId);
  }

  updateArticle(): void {
    this.articlesService.updateArticle(this.articleId, this.article).subscribe(response => console.log("Article updated !"));
  }

  addDescriptionItem(type: string) {
    console.log("Add "+type);
    let descriptionItem: ArticleDescription;
    if (type == 'title') {
      const title = new ArticleTitle();
      title.content = "Here the new title";
      descriptionItem = title;
    } else if (type == 'paragraph') {
      const paragraph = new ArticleParagraph()
      paragraph.content = "Here the new paragraph";
      descriptionItem = paragraph;
    }
    console.log(descriptionItem);
    this.descriptionItems.push(descriptionItem);
  }

}
