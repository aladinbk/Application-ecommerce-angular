import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';

import {CaddyService} from '../services/caddy.service';
import {Offre} from '../offres/model/offre.model';
import {OffreItem} from '../offres/model/offre-item.model';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
  timestamp = 0;
  public size = 3;
  public size1 = 12;
  public currentPage = 0;
  public NouveauxPrix = 2000;
  public totalPages: number;
  public pages: Array<number>;
  public currentkeyWord = '';
  currentUser;
  private offres;
  private editOffre: boolean;
  private curentOffre: any;
  private selectedFiles;
  private progress: number;
  private currentFileUpload: any;
  private title: string;
  private categories;
  private currentcategorie;
  datefinoffre;
  date=new Date();
  constructor(private catService: CatalogueService,
              private httpClient: HttpClient,
              private route: ActivatedRoute, private router: Router,
              public authService: AuthenticationService,
              public caddyService: CaddyService) {
  }
  isAvailabledoffres(obj):boolean {
    const dateObj = String(obj.date_fin).split('-');
    const dat1 = new Date().toISOString().split('-');
    // dateObj[0] == yyyy
    // dateObj[1] == MM
    // dateObj[2] == dd
    console.log("dat1",dat1);
    console.log("dateObj",dateObj);
    if(obj.date_fin == undefined || obj.date_fin == null)
      return false;
      const dd = new Date(Number(dateObj[0]),Number(dateObj[1])-1,Number(dateObj[2].substr(0,2)));
      console.log(obj,new Date().getTime(), dd.getTime(), '-', dd.getTime() >= new Date().getTime());
    if( dd.getTime() >= new Date().getTime() || 
    (Number(dateObj[0]) == Number(dat1[0]) && Number(dateObj[1]) == Number(dat1[1]) && Number(dateObj[2].substr(0,2)) == Number(dat1[2].substr(0,2))) ) {
      return true;
    }
    return false;
  }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
    this.router.navigateByUrl('deals-details/' + url);
  }

  OffreToCaddy(o: Offre) {

    if (this.currentUser) {
      if (this.currentUser.role === 'Client') {
        let selectedOffres = JSON.parse(sessionStorage.getItem('selectedOffres'));
        if (!selectedOffres) {
          selectedOffres = [];
          const offreItem = new OffreItem();
          offreItem.offres = o;
          offreItem.quantity = o.quantity;
          if (o.comission > 0) {
            offreItem.price = (o.currentprice - o.currentprice * o.comission / 100 ) * o.quantity;
          } else {
            offreItem.price = o.quantity * o.currentprice;
          }
          selectedOffres.push(offreItem);
        } else {
          const index = selectedOffres.findIndex(offre => offre.offres.id === o.id);
          if (index === -1) {
            const offreItem = new OffreItem();
            offreItem.offres = o;
            offreItem.quantity = o.quantity;
            if (o.comission > 0) {
              offreItem.price = (o.currentprice - o.currentprice * o.comission / 100 ) * o.quantity;
            } else {
              offreItem.price = o.quantity * o.currentprice;
            }

            selectedOffres.push(offreItem);
          } else {
            selectedOffres[index].quantity = selectedOffres[index].quantity + o.quantity;
            if (o.comission > 0) {
              selectedOffres[index].price = (o.currentprice - o.currentprice * o.comission / 100 ) * selectedOffres[index].quantity;
            } else {
              selectedOffres[index].price = selectedOffres[index].quantity * o.currentprice;
            }
          }
        }
        sessionStorage.setItem('selectedOffres', JSON.stringify(selectedOffres));
      } else {
        this.router.navigateByUrl('/login');
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  getCategories() {

    this.catService.getRessource('/categories')
      .subscribe(data => {
        this.categories = data;
        console.log(this.categories);
      }, err => {
        console.log(err);
      });
  }

  getOffresByCat(c) {
    this.currentcategorie = c;
    console.log(this.currentcategorie);
    this.router.navigateByUrl('/deals/2/' + c.id_c);

  }

  minusQuantity(o) {
    if (o.quantity > 1) {
      o.quantity = o.quantity - 1;
    }

  }

  plusQuantity(o) {
    o.quantity = o.quantity + 1;
  }
}
