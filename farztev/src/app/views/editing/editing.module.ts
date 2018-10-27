// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ArticlesComponent } from './articles.component';
import { ArticleComponent } from './article/article.component';


// Components Routing
import { EditingRoutingModule } from './editing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EditingRoutingModule
  ],
  declarations: [
    ArticlesComponent,
    ArticleComponent
  ]
})
export class EditingModule { }
