import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ArticlesService } from '../articles/articles.service';
import { CountriesService } from '../countries/countries.service';
import { Article } from './article';
import { ListCountry } from '../countries/listcountry';
import { ArticleDescription } from './articleDescription';
import { ArticleParagraph } from './articleParagraph';
import { ArticleTitle } from './articleTitle';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { ArticleAlbum } from './articleAlbum';
import { AlbumsService } from '../albums/albums.service';
import { ListAlbum } from '../albums/listalbum';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Media } from '../media/media';
import { MediaType } from '../media/mediatype';
import { MediaService } from '../media/media.service';
import { ArticlePhoto } from './articlePhoto';

@Component({
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css']
})
export class ArticleComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(public articlesService: ArticlesService, 
    public countriesService: CountriesService, 
    public albumsService: AlbumsService, 
    private route: ActivatedRoute, 
    private router: Router,
    public mediaService: MediaService,
    private modalService: BsModalService) {
  }
  dataAvailable = false;
  articleId: number;
  article: Article;
  descriptionItems: ArticleDescription[];
  countries: ListCountry[];
  @ViewChild('f') form: NgForm;
  albums: ListAlbum[] = [];

  ngOnInit() {
    this.initializeEmptyArticle();
    this.getCountries().subscribe(countries => {
      this.countries = countries;
      this.getAlbums().subscribe(albums => {
        this.albums = albums;
      });
      if (this.route.snapshot.paramMap.get('id') == 'new') {
        return;
      }
      // The JavaScript (+) operator converts the string to a number
      this.articleId = +this.route.snapshot.paramMap.get('id');
      if (this.articleId != null) {
        this.getArticle().subscribe(article => { this.article = article; this.descriptionItems = JSON.parse(this.article.description); this.dataAvailable = true; });
      }
    });
  }

  initializeEmptyArticle() {
    this.article = new Article();
    this.article.online = false;
    this.descriptionItems = [];
  }

  getCountries(): Observable<ListCountry[]> {
    return this.countriesService.getCountries();
  }
  getArticle(): Observable<Article> {
    return this.articlesService.getArticle(this.articleId);
  }
  getAlbums() : Observable<ListAlbum[]> {
    return this.albumsService.getAlbums();
  }

  deleteArticle(): void {
    if (confirm("Are you sure to want to remove the article '" + this.article.name + "' ?")) {
      this.articlesService.deleteArticle(this.articleId).subscribe(response => console.log("Article deleted !"));
      this.router.navigate(['articles'], {relativeTo: this.route.parent});
    }
  }

  onSubmit() {
    console.log(this.form);
    this.article.description = JSON.stringify(this.descriptionItems);
    if (this.article.id == null) {
      this.articlesService.insertArticle(this.article).subscribe(article => { this.article = article; console.log("Article inserted !");this.router.navigate(['articles'], {relativeTo: this.route.parent}); });
    } else {
      this.articlesService.updateArticle(this.articleId, this.article).subscribe(response => {console.log("Article updated !");this.router.navigate(['articles'], {relativeTo: this.route.parent});});
    }
  } 	

  addDescriptionItem(type: string, template: TemplateRef<any>) {
    console.log("Add " + type);
    let descriptionItem: ArticleDescription;
    if (type == 'title') {
      descriptionItem = new ArticleTitle();
      console.log(descriptionItem);
      this.descriptionItems.push(descriptionItem);
    } else if (type == 'paragraph') {
      descriptionItem = new ArticleParagraph();
      console.log(descriptionItem);
      this.descriptionItems.push(descriptionItem);
    } else if (type == 'album') {
      this.albumsService.getAlbums().subscribe(albums => {
        this.albums = albums;
        descriptionItem = new ArticleAlbum();
        console.log(descriptionItem);
        this.descriptionItems.push(descriptionItem);
      });
    } else if (type == 'photo') {
      this.openModal(template);
    }
  }

  addArticlePhoto(filePath : string) : void {
    let media = new Media();
    media.name = "";
    let mediaTypeId = MediaType[MediaType.PHOTO];
    media.type = mediaTypeId;
    media.online = true;
    media.url = filePath;
    media.albumId = null;
    this.mediaService.insertMedia(media).subscribe(media => {
      console.log("MEDIA ADDED ! " + media);

      let articlePhoto = new ArticlePhoto();
      articlePhoto.id = media.id;
      articlePhoto.url = media.url;
      console.log(articlePhoto);
      this.descriptionItems.push(articlePhoto);
    });
  }

  removeDescriptionItem(index: number) {
    this.descriptionItems.splice(index, 1);
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
  }
}
