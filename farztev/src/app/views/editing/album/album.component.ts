import {Component, OnInit, OnDestroy, TemplateRef, ElementRef, ViewChild} from '@angular/core';
import {ExplorerComponent} from '../explorer/explorer.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlbumsService } from '../albums/albums.service';
import { CountriesService } from '../countries/countries.service';
import { MediaService } from '../media/media.service';
import { ListCountry } from '../countries/listcountry';
import { Album } from './album';
import { Media } from '../media/media';
import { MediaType } from '../media/mediatype';
import { ListAlbum } from '../albums/listalbum';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: 'album.component.html',
  styleUrls: ['album.component.css']
})
export class AlbumComponent implements OnInit{
  modalRef: BsModalRef;
  constructor(public albumsService: AlbumsService, 
    public countriesService: CountriesService, 
    public mediaService: MediaService, 
    private route: ActivatedRoute, 
    private router: Router,
    private modalService: BsModalService) {
    /*
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });*/
    
  }
  dataAvailable = false;
  albumId: number;
  album: Album;
  medias: Media[];
  countries: ListCountry[];

  @ViewChild('f') form: NgForm;

  alertState : string = "hide";

  ngOnInit() {
    this.initializeEmptyAlbum();
    this.getCountries().subscribe(countries => {
      this.countries = countries;

      if (this.route.snapshot.paramMap.get('id') == 'new') {
        return;
      }
      // The JavaScript (+) operator converts the string to a number
      this.albumId = +this.route.snapshot.paramMap.get('id');
      if (this.albumId != null) {
        this.getAlbum().subscribe(album => { 
          this.album = album; 
          this.getMedias(album.id).subscribe(medias => {
            this.medias = medias;
            this.dataAvailable = true;
          });
        });
      }
    });
  }

  initializeEmptyAlbum() {
    this.album = new Album();
    this.album.online = false;
  }

  getCountries(): Observable<ListCountry[]> {
    return this.countriesService.getCountries();
  }
  getMedias(albumId: number): Observable<Media[]> {
    return this.mediaService.getMedias(albumId, MediaType.PHOTO);
  }
  getAlbum(): Observable<Album> {
    return this.albumsService.getAlbum(this.albumId);
  }
  deleteAlbum(): void {
    if (confirm("Are you sure to want to remove the album '" + this.album.name + "' ?")) {
      this.albumsService.deleteAlbum(this.albumId).subscribe(response => console.log("Album deleted !"));
      this.router.navigate(['albums'], {relativeTo: this.route.parent});
    }
  }

  onSubmit() {
    console.log(this.form);
    this.album.albumTypeId = 1;
    if (this.album.id == null) {
      this.albumsService.insertAlbum(this.album)
                          .subscribe(album => { this.album = album; console.log("Album inserted !");this.router.navigate(['albums'], {relativeTo: this.route.parent}); });
    } else {
      this.albumsService.updateAlbum(this.albumId, this.album).subscribe(response => {console.log("Album updated !");this.router.navigate(['albums'], {relativeTo: this.route.parent});});
    }
  }

  addSelection(filePath : string) : void {
    if(this.selectionExists(filePath)) {
      this.alertState = "show";
      setTimeout(() => {
        this.alertState = "hide";
      }, 2000);
      return;
    }
    let media = new Media();
    media.name = "";
    let mediaTypeId = MediaType[MediaType.PHOTO];
    media.type = mediaTypeId;
    media.online = true;
    media.url = filePath;
    media.albumId = this.albumId;
    this.mediaService.insertMedia(this.albumId, media).subscribe(media => this.medias.push(media));
  }

  selectionExists(filePath) : boolean {
    return this.medias.filter(function (m) {return m.url == filePath}).length == 1;
  }

  unselect(id : number):void {
    // Remove item by filtering
    this.mediaService.deleteMedia(this.albumId, id).subscribe(() => {
      this.medias = this.medias.filter(function(media){
        return id != media.id;
      });
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
  }

}
