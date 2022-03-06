import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { CaddyService } from '../services/caddy.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private currentcategorie;
  private categories;
  currentUser;

  constructor(private router:Router,private authService:AuthenticationService,private catService:CatalogueService,public caddyService:CaddyService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  onLogout(){
    this.authService.removeTokenFromLocalStorage();
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  getCategories() {
  
    this.catService.getRessource("/categories")
    .subscribe(data=>{
    this.categories=data;
    },err=>{
    console.log(err);
    })
    }
    getOffresByCat(c){
     this.currentcategorie=c;
     this.router.navigateByUrl('/offres/2/'+c.id);
      
    }
  onSelectedOffres(){
    this.currentcategorie=undefined;
    this.router.navigateByUrl("/offres/1/0");
  }
  onProductsPromo(){  
    this.currentcategorie=undefined;
    this.router.navigateByUrl("/offres/3/0");
  }
  onProductsDispo(){
    this.currentcategorie=undefined;
    this.router.navigateByUrl("/offres/4/0");

  }

}
