import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editcommande',
  templateUrl: './editcommande.component.html',
  styleUrls: ['./editcommande.component.css']
})
export class EditcommandeComponent implements OnInit {
  order:any;
  id:number;
  constructor(activatedRoute:ActivatedRoute,private catalservice: CatalogueService,    private httpClient:HttpClient,
    private route:ActivatedRoute,private router:Router) {
  console.log(activatedRoute.snapshot.params['id']);
  this.id=activatedRoute.snapshot.params['id']; }

  ngOnInit() {
    this.catalservice.getcommande(this.id)
  .subscribe(data=>{
    this.order=data;
    console.log(this.order);
  },err=>{
    console.log(err);
  })
  }
  update(){
    this.catalservice.updatecommande(this.order)
    .subscribe(data=>{
      alert("Mise a jour effectué ")
      this.router.navigate(['Gestion-commandes']);
    },err=>{
      console.log(err);
    })
  }
}
