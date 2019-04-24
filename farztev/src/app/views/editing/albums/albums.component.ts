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

  selections: string[] = [];

  ngOnInit() {
  }

  addSelection(filePath) : void {
    if(this.selectionExists(filePath)) {
      alert("This photo is already contained in the album");
      return;
    }
    this.selections.push(filePath);
  }

  selectionExists(filePath) : boolean {
    return this.selections.filter(function (s) {return s == filePath}).length == 1;
  }

  unselect(filePath):void {
    // Remove item by filtering
    this.selections = this.selections.filter(function(selection){
      return filePath != selection;
    });
  }

}
