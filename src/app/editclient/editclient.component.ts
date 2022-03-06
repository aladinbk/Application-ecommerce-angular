import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../offres/model/client.model';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit {
  client:any;
  id:number;
  constructor(activatedRoute:ActivatedRoute,private catalservice: CatalogueService) {
     console.log(activatedRoute.snapshot.params['id']);
     this.id=activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
  this.catalservice.getClient(this.id)
  .subscribe(data=>{
    this.client=data;
  },err=>{
    console.log(err);
  })
  }

update(){
  this.catalservice.updateclient(this.client)
  .subscribe(data=>{
    alert("Mise a jour effectué ")
  },err=>{
    console.log(err);
  })
}

}
