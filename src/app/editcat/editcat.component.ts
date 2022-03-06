import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-editcat',
  templateUrl: './editcat.component.html',
  styleUrls: ['./editcat.component.css']
})
export class EditcatComponent implements OnInit {
  id_c:number;
  category:any;
  constructor(activatedRoute:ActivatedRoute,private catalservice: CatalogueService,    private httpClient:HttpClient,
    private route:ActivatedRoute,private router:Router) {
    console.log(activatedRoute.snapshot.params['id_c']);
    this.id_c=activatedRoute.snapshot.params['id_c']; 
  }

  ngOnInit() {
    this.catalservice.getonecategorie(this.id_c)
    .subscribe(data=>{
      this.category=data;
      console.log(this.category);
    },err=>{
      console.log(err);
    })
    }
    update(){
      this.catalservice.updatecategory(this.category)
      .subscribe(data=>{
        alert("Mise a jour effectué ")
        this.router.navigate(['Gestion-categories']);
      },err=>{
        console.log(err);
      })
    }

}
