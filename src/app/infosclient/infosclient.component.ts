import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../offres/model/client.model';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-infosclient',
  templateUrl: './infosclient.component.html',
  styleUrls: ['./infosclient.component.css']
})
export class InfosclientComponent implements OnInit {
name:String;
client = new Client();
  confirmPwd: any;
  existEmail;
  id: any;
  constructor(private clientService: ClientService,
    private router: Router,activatedRoute:ActivatedRoute,private catalservice: CatalogueService) {
    
     }

  ngOnInit() {
    this.client = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.client);
    
  
  }
  update(){
    this.catalservice.updateclient(this.client)
    .subscribe(data=>{
      alert("Mise a jour effectué ");
      location.reload();
    },err=>{
      console.log(err);
    })
  }

}
