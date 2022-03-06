import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { Offre } from '../offres/model/offre.model';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-new-offre',
  templateUrl: './new-offre.component.html',
  styleUrls: ['./new-offre.component.css']
})
export class NewOffreComponent implements OnInit {
  public curentOffre: Offre;
  private editOffre: boolean;
  private selectedFiles: any;
  progress: number;
  currentFileUpload: any;
  private curentTime: number;
  private editPhoto: boolean;
  private mode = 0;
  private categories;
  private currentcategorie;
  tab: any;
  id_c: number;
  name: string;
  timestamp = 0;


  public offres: Offre;
  constructor(private router: Router, private route: ActivatedRoute, private catalservice: CatalogueService, public authService: AuthenticationService) { }

  ngOnInit() {
    this.getCategories();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
         const url = val.url;
         console.log(url);
         const p1 = this.route.snapshot.params.p1;

      }
    });
    const p1 = this.route.snapshot.params.p1;
  }
  getCategories() {

    this.catalservice.getRessource('/categories')
    .subscribe(data => {
    this.categories = data;
    }, err => {
    console.log(err);
    });
    }
    getOffresByCat(c) {
      this.currentcategorie = c;
      this.router.navigateByUrl('/offres/2/' + c.id_c);

     }
    onsaveOffre(data: any) {
    console.log(data);
    data.category = {'id_c': this.id_c};
   // console.log(data.category);
  //  data._links.category={"id":this.id};
    this.catalservice.saveRessource(this.catalservice.host + '/listOffres', data)
    .subscribe(res => {
      if (res == '') {
        alert('Vérifier les champs');
      } else {
    console.log(res);
    alert('deal ajouté avec succées');
    this.router.navigateByUrl('offres/1/0');
  }
    }, err => {
    console.log(err);
    alert('Offre n\'est pas ajouter champs requis* ');
   });
  }
  onsavecat(data: any) {
    console.log(data);
    data.category = {'name': this.name};
   // console.log(data.category);
  //  data._links.category={"id":this.id};
    this.catalservice.saveRessource2(this.catalservice.host + '/addcat', data)
    .subscribe(res => {
    console.log(res);
    alert('Categorie a été creer');
    this.router.navigateByUrl('offres/1/0');
    }, err => {
    console.log(err);
    alert('Offre n\'est pas ajouter');
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
       // this.getOffres("/offreses/search/selectedOffres");
        this.timestamp = Date.now();

      }
    }, err => {
      alert('Probléme de chargement...');
    });
    this.selectedFiles = undefined;
  }

  getTS() {
    return this.curentTime;
  }
}
