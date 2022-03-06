import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';
import { OrdreService } from '../services/ordre.service';

@Component({
  selector: 'app-blogpost-featured',
  templateUrl: './blogpost-featured.component.html',
  styleUrls: ['./blogpost-featured.component.css']
})
export class BlogpostFeaturedComponent implements OnInit {
  data: Object;
  count= [];
  constructor(private catService:CatalogueService,
    private orderService:OrdreService,
    private httpClient:HttpClient,
    private route:ActivatedRoute,private router:Router,
    public authService:AuthenticationService,
  
    public caddyService:CaddyService) { }

  ngOnInit() {
    this.count.length=10;
        this.orderService.getCommandes().subscribe(res=>{
      console.log(res);
      this.data=res;
    });
  
  }
  oneditcommande(id:number){
    this.router.navigate(['editcommande',id]);

  }
 
}
