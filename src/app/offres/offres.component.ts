import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Offre } from './model/offre.model';
import { CaddyService } from '../services/caddy.service';


@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
 private offres;
 private editOffre: boolean;
 private curentOffre: any;
 private selectedFiles;
 private progress: number;
 private currentFileUpload: any;
 timestamp = 0;
 private title: string;
 public size = 3;
 public size1 = 12;

 public currentPage = 0;
 public NouveauxPrix = 2000;
 public totalPages: number;
 public pages: Array<number>;
 private categories;
 private currentcategorie;
 public currentkeyWord = '';
constructor(private catService: CatalogueService,
  private httpClient: HttpClient,
  private route: ActivatedRoute, private router: Router,
  public authService: AuthenticationService,

  public caddyService: CaddyService) {}

  ngOnInit() {
    this.getCategories();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
         const url = val.url;
         console.log(url);
         const p1 = this.route.snapshot.params.p1;
      if (p1 == 1) {
         this.title = 'Les Plus Demandés';
         this.getOffres('/offreses/search/selectedOffres');
       } else if (p1 == 2) {
         const idCat = this.route.snapshot.params.p2;
         this.title = 'Offres de la catégorie' + idCat;
         this.getOffres('/categories/' + idCat + '/offrees');
       } else if (p1 == 3) {
         this.title = 'Offres on Promotions';
         this.getOffres('/offreses/search/promoOffres');
      } else if (p1 == 4) {
         this.title = 'Offres disponibles';
         this.getOffres('/offreses/search/dispoOffres');
      } else if (p1 == 5) {
         this.title = 'Recherche';
         this.getOffres('/offreses/search/dispoOffres');
      }
      }
    });
    let p1 = this.route.snapshot.params.p1;
    if (p1 = 1) {
      this.getOffres('/offreses/search/selectedOffres');
    }
}
getOffres(url) {
  this.catService.getRessource(url)
  .subscribe(data => {
   this.offres = data;
  console.log(this.offres);
  }, err => {
    console.log(err);
  });
  }

   gettousoffres() {
   this.catService.getOff(this.currentPage, this.size)
   .subscribe(data => {
    this.totalPages = data['page'].totalPages;
    console.log(this.totalPages);
     this.pages = new Array<number>(this.totalPages);
     this.offres = data;
  }, err => {
     console.log(err);
   });
 }

 onPageoffres(i) {
   this.currentPage = i;
   this.chercherproduits();
 }
 onChercher(form: any) {
   this.currentPage = 0;
  this.currentkeyWord = form.keyword;
   this.chercherproduits();
 }
 chercherproduits() {
  this.catService.getOffpagebyKey(this.currentkeyWord, this.currentPage, this.size)
  .subscribe(data => {
  console.log(data);
  this.totalPages = data['page'].totalPages;
  console.log(this.totalPages);
  this.pages = new Array<number>(this.totalPages);
  this.offres = data;
  }, err => {
    console.log(err);
  });
}
onDeleteOffre(o) {
  const conf = confirm('Etes Vous Sure ?');
  if (conf) {
    this.catService.deleteOffre(o._links.self.href)
    .subscribe(data => {
     this.chercherproduits();
    }, err => {
     console.log(err);
    });
  }
}
OnEditOffre(o) {
  this.curentOffre = o;
  this.editOffre = true;
}
onSelectedFile(event) {
this.selectedFiles = event.target.files;
}
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catService.uploadPhotoOffre(this.currentFileUpload, this.curentOffre.id).subscribe(event => {
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
    return this.timestamp;
  }
  isAdmin() {
    return this.authService.isAdmin();
  }
  onOffresDetails(o: Offre) {
    const url = btoa(o._links.offres.href);
   this.router.navigateByUrl('offres-details/' + url);
  }
  OffreToCaddy(o: Offre) {
  this.caddyService.onAddOffreToCaddy(o);
  }
  getCategories() {

    this.catService.getRessource('/categories')
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



}
