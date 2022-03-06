import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { OrdreService } from '../services/ordre.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private categories;
  private currentcategorie;
  data: Object;
  dataclients: Object;
  constructor( private orderService: OrdreService, private catService: CatalogueService, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.client = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.client);
    this.orderService.getNBCommandes().subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
    this.orderService.getNBClients().subscribe(res => {
      this.dataclients = res;
      console.log(this.dataclients);
    });

  }
  client(client: any) {
    throw new Error("Method not implemented.");
  }

}
