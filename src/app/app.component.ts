import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './catalogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private categories;
  private currentcategorie;
  constructor(private catService: CatalogueService, private router: Router, private authService: AuthenticationService) {}


  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();

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



  title = 'app';
}

