import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-addcat',
  templateUrl: './addcat.component.html',
  styleUrls: ['./addcat.component.css']
})
export class AddcatComponent implements OnInit {
  name:string;
  private categories;
  private currentcategorie;

  constructor(private router:Router,private route:ActivatedRoute,private catalservice:CatalogueService,public authService:AuthenticationService) { }

  ngOnInit() {
    
    this.getCategories();
    
    
  }
  onsavecat(data:any){
    console.log(data);
    data.category = {"name":this.name};
   // console.log(data.caegory);
  //  data._links.category={"id":this.id};
    this.catalservice.saveRessource2(this.catalservice.host+"/addcat",data) 
    .subscribe(res=>{ 
      if(res==""){
        alert("Categorie n'est pas ajouter champs requis*");
      }
      else{
    console.log(res);
    alert("Categorie a été creer");
    this.router.navigateByUrl("Gestion-categories");
  }
    },err=>{
    console.log(err);
    alert("Categorie n'est pas ajouter");
   })
  }
  getCategories() {
  
    this.catalservice.getRessource("/categories")
    .subscribe(data=>{
    this.categories=data;
    },err=>{
    console.log(err);
    })
    }
   oneditcategory(id_c:number){
    this.router.navigate(['editcategory',id_c]);
   }
    onDeletecat(c){
      let conf=confirm("Etes Vous Sure ?")
      if(conf){
        this.catalservice.deletecat(c._links.self.href)
        .subscribe(data=>{
          this.getCategories();
        },err=>{
         console.log(err);
        })
      }
    }
}
