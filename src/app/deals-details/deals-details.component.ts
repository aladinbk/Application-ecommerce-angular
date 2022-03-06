import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { Offre } from '../offres/model/offre.model';
import { AuthenticationService } from '../services/authentication.service';
import { OffreItem } from '../offres/model/offre-item.model';

@Component({
  selector: 'app-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrls: ['./deals-details.component.css']
})
export class DealsDetailsComponent implements OnInit {
  public size:number=12;
  public curentOffre:Offre;
  private editOffre: boolean;
  private selectedFiles:any;
  progress: number;
  currentFileUpload: any;
  private curentTime: number;
  private editPhoto: boolean;
 private mode: number=0;
 public currentPage:number=0;
  public NouveauxPrix:number=2000;
  public totalPages:number;
  public pages:Array<number>;
  private categories;
  private currentcategorie;
  public currentkeyWord:string="";
  private offres;
  currentUser;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private catalservice:CatalogueService,
    public authService:AuthenticationService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let url=atob(this.route.snapshot.params.url)
    this.catalservice.getOffre(url).subscribe(data=>{
     this.curentOffre=data;
    })
   
  }
  OffreToCaddy(curentOffre: Offre) {
   
    if (this.currentUser) {
      let conf=confirm("Vous vouler ajouter ce deal dans panier ?")
      if(conf){
      if (this.currentUser.role === 'Client') {
        let selectedOffres = JSON.parse(sessionStorage.getItem('selectedOffres'));
        if (!selectedOffres) {
          selectedOffres = [];
          const offreItem = new OffreItem();
          offreItem.offres = curentOffre;
          offreItem.quantity = curentOffre.quantity;
          if (curentOffre.comission > 0) {
            offreItem.price = (curentOffre.currentprice - curentOffre.currentprice * curentOffre.comission / 100 ) * curentOffre.quantity;
          } else {
            offreItem.price = curentOffre.quantity * curentOffre.currentprice;
          }
          selectedOffres.push(offreItem);
        } else {
          const index = selectedOffres.findIndex(offre => offre.offres.id === curentOffre.id);
          if (index === -1) {
            const offreItem = new OffreItem();
            offreItem.offres = curentOffre;
            offreItem.quantity = curentOffre.quantity;
            if (curentOffre.comission > 0) {
              offreItem.price = (curentOffre.currentprice - curentOffre.currentprice * curentOffre.comission / 100 ) * curentOffre.quantity;
            } else {
              offreItem.price = curentOffre.quantity * curentOffre.currentprice;
            }

            selectedOffres.push(offreItem);
          } else {
            selectedOffres[index].quantity = selectedOffres[index].quantity + curentOffre.quantity;
            if (curentOffre.comission > 0) {
              selectedOffres[index].price = (curentOffre.currentprice - curentOffre.currentprice * curentOffre.comission / 100 ) * selectedOffres[index].quantity;
            } else {
              selectedOffres[index].price = selectedOffres[index].quantity * curentOffre.currentprice;
            }
          }
        }
        sessionStorage.setItem('selectedOffres', JSON.stringify(selectedOffres));
      } else {
        this.router.navigateByUrl('/login');
      }
    }
  }
     else {
      this.router.navigateByUrl('/login');
    }
  }

  OnEditPhoto(o){
    this.curentOffre=o;
    this.editPhoto=true;
  }
  onSelectedFile(event){
    this.selectedFiles=event.target.files;
  }
  uploadPhoto(){
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalservice.uploadPhotoOffre(this.currentFileUpload, this.curentOffre.id).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
        console.log(this.progress);
      }
      else if(event instanceof HttpResponse) {
        this.curentTime = Date.now();
      }
      },err=>{
      alert("Probléme de chargement...");
      })
      this.selectedFiles = undefined
  }
 
  getTS(){
    return this.curentTime;
  }   
  OnEditOffre(){
    this.mode=1;
  }
  OnUpdateOffre(data){
  }

  onPageoffres(i){
    this.currentPage=i;
    this.chercherproduits()
  }
  onChercher(form: any){
    this.currentPage=0;
   this.currentkeyWord=form.keyword;
   if(this.currentkeyWord!=""){this.chercherproduits();}
   else{
     alert("taper un Nom du deal");
   }
    
  }
  chercherproduits(){
   this.catalservice.getOffpagebyKey(this.currentkeyWord,this.currentPage,this.size)
   .subscribe(data=>{    
   console.log(data);
   this.totalPages=data["page"].totalPages;
   console.log(this.totalPages);
   this.pages=new Array<number>(this.totalPages);  
   this.offres=data;
   },err=>{
     console.log(err);
   });
 }
}
