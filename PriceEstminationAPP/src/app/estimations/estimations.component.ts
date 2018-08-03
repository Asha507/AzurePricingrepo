import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { ProjectDetails } from '../projectdetails/ProjectDetails';

@Component({
  selector: 'app-estimations',
  templateUrl: './estimations.component.html',
  styleUrls: ['./estimations.component.css']
})
export class EstimationsComponent implements OnInit {

  public data:Array<any> = [];
  public keys: Array<string> = [];
  searchEmail:string="";
  searchID:string="";
  searchClient:string="";
  selectedItem:string;

  index:number=0;
  constructor(private resourcesService:ResourcesService) {
   
  }

  ngOnInit() {

  }

  SearchByID()
  {
    if(this.searchID!="")
    {
      debugger; 
      this.searchEmail="";
      this.searchClient="";
    this.resourcesService.getProjectDetailsByID(this.searchID).subscribe(response=>
      {
        this.data=response;
        this.keys=Object.keys(this.data);
      });
    }
  }

  SearchByEmail()
  {
    if(this.searchEmail!="")
    {
      this.searchClient="";
      this.searchID="";
    this.resourcesService.getProjectDetailsByEmail(this.searchEmail).subscribe(response=>
      {
        debugger;
        this.data=response;
        this.keys=Object.keys(this.data);
      });
    }
  }
  
  SearchByclient()
  {
    if(this.searchClient!="")
    {
      this.searchEmail="";
      this.searchID="";
    this.resourcesService.getProjectDetailsByClient(this.searchClient).subscribe(response=>
      {
        debugger;
        this.data=response;
        this.keys=Object.keys(this.data);
      });
    }
  }
  onKeydown(from) {
    if(from=='ID')
    {
      this.SearchByID();
    }
    if(from=='Email')
    {
      this.SearchByEmail();
    }
    if(from=='Client')
    {
      this.SearchByclient();
    }
  }

  OnSelect(item)
  {
    debugger;
     this.selectedItem=item;
  }

}
