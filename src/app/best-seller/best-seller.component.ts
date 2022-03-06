import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';
import { Client } from '../offres/model/client.model';
@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit {
  data: any;
  timestamp = 0;
  public size = 3;
  public size1 = 12;
  public currentPage = 0;
  public NouveauxPrix = 2000;
  public totalPages: number;
  public pages: Array<number>;
  public currentkeyWord = '';
  currentUser;
  private clients;
  private editOffre: boolean;
  private curentOffre: any;
  private selectedFiles;
  private progress: number;
  private currentFileUpload: any;
  private title: string;
  private categories;
  private currentcategorie;


  constructor(private catService:CatalogueService,
    private httpClient:HttpClient,
    private route:ActivatedRoute,private router:Router,
    public authService:AuthenticationService,
  
    public caddyService:CaddyService) { }

  ngOnInit() {

 this.catService.getClients().subscribe(res=>{
  console.log(res);
  this.data=res;
  

});
    }
    addclient(){
      this.router.navigate(['add-client']);
    }
    clientdetails(id:number){
      this.router.navigate(['edit-client',id]);
    }

    onDeleteclient(c:Client){
      let conf=confirm("Etes Vous Sure ?")
      if(conf){
        this.catService.deleteclient(c.id)
        .subscribe(data=>{
          let conf=confirm("Client a été supprimé")
          location.reload();
        },err=>{
         console.log(err);
        })
      }
    }
    oneditclient(id:number){
      this.router.navigate(['editclient',id]);
    }
   
    onChercher(form: any) {
      this.currentkeyWord = form.keyword;
      console.log(form.keyword);
      console.log(this.currentkeyWord);
      this.chercherclients();
    }
    chercherclients() {
      this.catService.getclientpagebyKey(this.currentkeyWord)
    
        .subscribe(data => {
          console.log(data);
      
          this.clients = data;
          console.log(this.clients);
        }, err => {
          console.log(err);
        });
    }


}
