import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ArticlesComponent } from './articles.component';
import { ArticleComponent } from './article/article.component';
import { ArticlesRoutingModule } from './articles-routing.module';

@NgModule({
  imports: [
    ArticlesRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ ArticlesComponent, ArticleComponent ]
})
export class ArticlesModule { }
