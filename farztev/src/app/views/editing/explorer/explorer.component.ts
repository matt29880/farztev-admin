import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { FileDetailDto } from './fileDetailDto';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import {ExplorerService} from './explorer.service';

@Component({
  selector: 'farztev-explorer',
  templateUrl: 'explorer.component.html',
  styleUrls: ['explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  constructor(public explorerService: ExplorerService) {
  }

  files: FileDetailDto[];
  currentImagePath: string;
  currentPath: string;
  previousPaths: string[];
  @ViewChild('f') form: NgForm;

  ngOnInit() {
    this.currentImagePath = "/no-image.jpg";
    this.currentPath = "/";
    this.previousPaths = [];
    this.go("/");
  }

  getFiles(folderPath : string): Observable<FileDetailDto[]> {
    return this.explorerService.getFiles(folderPath);
  }

  onSubmit() {
    console.log(this.form);
  }

  openDirectory(folderPath): void {
    this.previousPaths.push(this.currentPath);
    this.go(folderPath);
  }
  openFile(path): void {
    this.currentImagePath = path;
  }
  go(folderPath): void {
    this.getFiles(folderPath).subscribe(files => {
      this.files = files;
      this.currentPath = folderPath;
    });
  }
  goBack(): void {
    console.log(this.previousPaths);
    this.go(this.previousPaths.pop());
  }
}
