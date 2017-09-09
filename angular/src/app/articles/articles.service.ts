import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {ListArticle} from './listarticle';
import {Article} from './article/article';
import {environment} from '~/../environments/environment';

@Injectable()
export class ArticlesService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private articlesUrl = `${environment.backendUrl}/articles`;  // URL to web api
  constructor(private http: Http) {}

  getArticles(): Promise<ListArticle[]> {
    return this.http.get(this.articlesUrl)
      .toPromise()
      .then(response => {
        return response.json() as ListArticle[];
      })
      .catch(this.handleError);
  }


  getArticle(articleId: number): Promise<Article> {
    return this.http.get(this.articlesUrl + '/' + articleId)
      .toPromise()
      .then(response => {
        return response.json() as Article;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
