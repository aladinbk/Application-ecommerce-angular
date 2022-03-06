import { Component, OnInit } from '@angular/core';
import { CaddyService } from '../services/caddy.service';
import { Caddy } from '../offres/model/caddy.model';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import {Offre} from '../offres/model/offre.model';
import {OffreItem} from '../offres/model/offre-item.model';
import {OrdreService} from '../services/ordre.service';
import {Order} from '../offres/model/Order.model';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {
  selectedOffres: OffreItem[];
  timestamp = 0;
  data:any;

  constructor(private router: Router,
              private orderService: OrdreService) { }

  ngOnInit() {
   this.selectedOffres = JSON.parse(sessionStorage.getItem('selectedOffres'));
   console.log(this.selectedOffres);
   if(this.selectedOffres==null){
    alert("Votre Panier est vide !")
  }
  }

  getTotal() {
    if(this.selectedOffres==null){
      return 0;
    }


else{
    const sum = this.selectedOffres
      .map(a =>  (a.offres.currentprice * a.quantity) ).reduce(function(a, b) {
        return a + b;
      });

      return sum;

  }
}
  getTotalRemise() {
    const sum = this.selectedOffres
      .map(a =>  a.price ).reduce(function(a, b) {
        return a + b;
      });
 
    return sum;
  }

  ondeletedeal(data){
    console.log(data);
    this.selectedOffres = JSON.parse(sessionStorage.getItem('selectedOffres'));
    console.log(this.selectedOffres);
    
    this.selectedOffres.splice(this.selectedOffres.indexOf(data), 1);
    alert('Vous vouler supprimer ce deal');
    sessionStorage.setItem('selectedOffres', JSON.stringify(this
      .selectedOffres));

console.log(this.selectedOffres);
   
   
   
   // this.data.clear();
    //sessionStorage.clear();
  }

  OnNewOrder() {
    let conf=confirm("Vous vouler confirmer la commande ?")
    if(conf){
    const order  = new Order();
    order.client = JSON.parse(localStorage.getItem('currentUser'));
    order.totalAmount = this.getTotalRemise();
    order.achatsItems = this.selectedOffres;
    this.orderService.passerCommande(order).subscribe(res => {
      sessionStorage.clear();
       this.router.navigate(['/facture', res.id]);
    }, ex => {
      console.log(ex);
    });
  }
  }

  getTS() {
    return this.timestamp;
  }

}
