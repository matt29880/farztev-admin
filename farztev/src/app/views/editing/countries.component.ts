import {Component, OnInit, OnDestroy} from '@angular/core';
import {ListArticle} from './listarticle';
import {CountriesService} from './countries.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  templateUrl: 'countries.component.html'
})
export class CountriesComponent implements OnInit, OnDestroy {
  constructor(public countriesService: CountriesService, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.getCountries();
  }

  listarticle: ListArticle[];

  getCountries(): void {
    this.countriesService.getCountries().subscribe(listarticle => this.listarticle = listarticle);
  }
  ngOnDestroy(): void {
    this.listarticle = null;
  }

}
