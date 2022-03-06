import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';
import { Offre } from '../offres/model/offre.model';
@Component({
  selector: 'app-userinterface',
  templateUrl: './userinterface.component.html',
  styleUrls: ['./userinterface.component.css']
})
export class UserinterfaceComponent implements OnInit {
  private offres;
  private editOffre: boolean;
  private curentOffre: any;
  private selectedFiles;
  private progress: number;
  private currentFileUpload: any;
  timestamp = 0;
  private title: string;
  public size = 12;
  public size1 = 6;
  public size3 = 3;
  public size4 = 1;
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
   isaujordui(obj):boolean {
    const dateObj = String(obj.date_fin).split('-');
    // dateObj[0] == yyyy
    // dateObj[1] == MM
    // dateObj[2] == dd
    if(obj.date_fin == undefined || obj.date_fin == null)
      return false;
    const dd = new Date(Number(dateObj[0]),Number(dateObj[1])-1,Number(dateObj[2].substr(0,2)));
    console.log(dateObj, dd, '-', dd.getTime() > new Date().getTime());
    if( Math.abs (dd.getTime()-new Date().getTime())<=(24*60*60*1000) ) {
      return true;
    }
    return false;
  }

   isAvailabledoffres(obj):boolean {
    const dateObj = String(obj.date_fin).split('-');
    // dateObj[0] == yyyy
    // dateObj[1] == MM
    // dateObj[2] == dd
    if(obj.date_fin == undefined || obj.date_fin == null)
      return false;
    const dd = new Date(Number(dateObj[0]),Number(dateObj[1])-1,Number(dateObj[2].substr(0,2)));
    console.log(dateObj, dd, '-', dd.getTime() > new Date().getTime());
    if( dd.getTime() > new Date().getTime() ) {
      return true;
    }
    return false;
  }

   ngOnInit() {

    this.getproductsexp();
    this.getCategories();

 }
 getproductsexp(){
  this.catService.getproducts()
  .subscribe(data => {

    this.offres = data;
    console.log(this.offres);
  }, err => {
    console.log(err);
  });

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
   getOffresp() {
    this.catService.getOff(this.currentPage, this.size1)
    .subscribe(data => {
      this.totalPages = data['page'].totalPages;
      this.pages = new Array<number>(this.totalPages);
      this.offres = data;
    }, err => {
      console.log(err);
    });

    }


    gettousoffres() {
    this.catService.getOff(this.currentPage, this.size3)
    .subscribe(data => {
     this.totalPages = data['page'].totalPages;
     console.log(this.totalPages);
      this.pages = new Array<number>(this.totalPages);
      this.offres = data;
   }, err => {
      console.log(err);
    });
  }
  getoffresbyOne() {
    this.catService.getOff(this.currentPage, this.size4)
    .subscribe(data => {
     this.totalPages = data['page'].totalPages;
     console.log(this.totalPages);
      this.pages = new Array<number>(this.totalPages);
      this.offres = data;
      console.log(this.offres);
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
   if (this.currentkeyWord != '') {this.chercherproduits(); } else {
     alert('taper un Nom du deal');
   }

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
     console.log(o);
          const url = btoa(o._links.offres.href);

    this.router.navigateByUrl('deals-details/' + url);
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
      this.router.navigateByUrl('/deals/2/' + c.id_c);

     }

}
