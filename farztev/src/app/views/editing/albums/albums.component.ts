import {Component, OnInit, OnDestroy, TemplateRef} from '@angular/core';
import {ExplorerComponent} from '../explorer/explorer.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'albums.component.html',
  styleUrls: ['albums.component.css']
})
export class AlbumsComponent implements OnInit{
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {
    /*
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });*/
  }

  selections: string[] = [];
  alertState : string = "hide";

  ngOnInit() {
  }

  addSelection(filePath) : void {
    if(this.selectionExists(filePath)) {
      this.alertState = "show";
      setTimeout(() => {
        this.alertState = "hide";
      }, 2000);
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
  }

}
