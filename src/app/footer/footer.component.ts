import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { CatalogueService } from '../catalogue.service';
import { Client } from '../offres/model/client.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
client:Client;
data:any;
curentclient;
idclient:number;
  constructor(public activatedRoute:ActivatedRoute,private route:ActivatedRoute,public http:Http,public catalservice :CatalogueService,private router:Router) {

    this.idclient=activatedRoute.snapshot.params['id'];
    console.log("id="+this.idclient);
    
 
   }

  ngOnInit() {
    this.catalservice.getClient(this.idclient).subscribe(data=>{
      this.curentclient=data;
      console.log(this.curentclient);
     })
  }
  Updateclient(){
    this.catalservice.updateclient(this.curentclient)
   .subscribe(data=>{
     console.log(data);
     alert("mise a jour effectué");
     this.router.navigate(['Gestion-clients']);
   },err=>{
    console.log(err); 
    alert("ERROR");
   })
  
  }    

}
