import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { Offre } from '../offres/model/offre.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-offres-details',
  templateUrl: './offres-details.component.html',
  styleUrls: ['./offres-details.component.css']
})
export class OffresDetailsComponent implements OnInit {
  public curentOffre;
  private editOffre: boolean;
  private selectedFiles: any;
  progress: number;
  currentFileUpload: any;
  private curentTime: number;
  private editPhoto: boolean;
 private mode = 0;
  constructor(private router: Router, private route: ActivatedRoute, private catalservice: CatalogueService, public authService: AuthenticationService) { }

  ngOnInit() {

    const url = atob(this.route.snapshot.params.url);
    this.catalservice.getOffre(url).subscribe(data => {
     this.curentOffre = data;
    });

  }
  OnEditPhoto(o) {
    this.curentOffre = o;
    this.editPhoto = true;
  }
  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catalservice.uploadPhotoOffre(this.currentFileUpload, this.curentOffre.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
        console.log(this.progress);
      } else if (event instanceof HttpResponse) {
        this.curentTime = Date.now();
      }
      }, err => {
      alert('Probléme de chargement...');
      });
      this.selectedFiles = undefined;
  }

  getTS() {
    return this.curentTime;
  }
  OnEditOffre() {
    this.mode = 1;
  }
  OnUpdateOffre(data) {
    const url = this.curentOffre._links.self.href;
    this.catalservice.pathRessource(url, data)
    .subscribe(d => {
      this.curentOffre = d;
      this.mode = 0;
      console.log('offre a été modifié');
    }, err => {
      console.log('Error');
      console.log(err);
    });
  }

}
