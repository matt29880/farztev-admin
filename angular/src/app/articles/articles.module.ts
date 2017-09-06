import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ArticlesComponent } from './articles.component';
import { ArticlesRoutingModule } from './articles-routing.module';

@NgModule({
  imports: [
    ArticlesRoutingModule,
    ChartsModule
  ],
  declarations: [ ArticlesComponent ]
})
export class ArticlesModule { }
