import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {CatalogueService} from '../catalogue.service';
import {CaddyService} from '../services/caddy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  timestamp = 0;
  public size = 5;
  public currentPage = 0;
  public NouveauxPrix = 2000;
  public totalPages: number;
  public pages: Array<number>;
  public currentkeyWord = '';
  private currentcategorie;
  private categories;
  private offres;
  private editOffre: boolean;
  private curentOffre: any;
  private selectedFiles;
  private progress: number;
  private currentFileUpload: any;
  private title: string;
  currentUser;
  constructor(private router: Router,
              private authService: AuthenticationService,
              private catService: CatalogueService,
              public caddyService: CaddyService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onLogout() {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
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
    this.router.navigateByUrl('/offres/2/' + c.id);

  }

  onSelectedOffres() {
    this.currentcategorie = undefined;
    this.router.navigateByUrl('/offres/1/0');
  }

  onProductsPromo() {
    this.currentcategorie = undefined;
    this.router.navigateByUrl('/offres/3/0');
  }

  onProductsDispo() {
    this.currentcategorie = undefined;
    this.router.navigateByUrl('/offres/4/0');

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

  logout() {
    localStorage.clear();
  }
}
