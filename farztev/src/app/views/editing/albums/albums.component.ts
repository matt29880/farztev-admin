import {Component, OnInit, OnDestroy} from '@angular/core';
import {ExplorerComponent} from '../explorer/explorer.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  templateUrl: 'albums.component.html'
})
export class AlbumsComponent implements OnInit{
  constructor() {
    /*
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });*/
  }

  ngOnInit() {
  }

}
