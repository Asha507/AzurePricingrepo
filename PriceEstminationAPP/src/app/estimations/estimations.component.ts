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
  rowsOnPage: number = 5;
  public filterQuery = "";
  public showApproveButton:boolean=true;
  public showRejectButton:boolean=true;
  public remark:any =[];;
  index:number=0;
  constructor(private resourcesService:ResourcesService) {
   
  }

  ngOnInit() {

  }

  SearchByID(id)
  {
    this.resourcesService.getProjectDetailsByID(id).subscribe(response=>
      {
        debugger;
        this.data=response;
        this.keys=Object.keys(this.data);
      });
  }

  SearchByEmail(email)
  {
    this.resourcesService.getProjectDetailsByEmail(email).subscribe(response=>
      {
        debugger;
        this.data=response;
        this.keys=Object.keys(this.data);
      });
  }
  
}
