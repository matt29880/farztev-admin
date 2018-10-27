import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './articles.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: 'articles',
        component: ArticlesComponent,
        data: {
          title: 'Articles'
        }
      },
      {
        path: 'articles/:id',
        component: ArticleComponent,
        data: {
          title: 'Article'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditingRoutingModule {}
