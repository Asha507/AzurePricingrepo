import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { ResourceType, ResourceSizes } from 'src/app/ResourceType';
import { ProjectDetails } from './ProjectDetails';
import { ResourceDetails } from './ResourceDetails';
import { PricingService } from '../services/pricing-service.service';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css']
})
export class ProjectdetailsComponent implements OnInit {
  resourcesList: Array<ResourceType>;
  projectDetails: ProjectDetails;
  resourceDetails: Array<ResourceDetails> = [];

  constructor(private resourcesService: ResourcesService, private pricingService: PricingService) { }

  ngOnInit() {

    this.projectDetails = new ProjectDetails();
    this.projectDetails.CreatedOn = new Date().toLocaleDateString();
    this.projectDetails.Environment = "Select";
    this.projectDetails.ProjectResources = this.resourceDetails;
    this.addNewResource();
    this.resourcesService.getJSON().subscribe(data => {
      this.resourcesList = data.Resource;
    });
  }
  addNewResource() {
    this.resourceDetails.push(
      { ResourceType: 'Select', ResourceSize: 'Select', SizeDescription: '', Price: '0', Sizes: [] }
    );
  }
  GetResourceSizes(value, i) {
    debugger;
    this.resourceDetails[i].ResourceSize = "Select";
    this.resourceDetails[i].Price = "0";
    this.resourceDetails[i].SizeDescription = "";
    if (this.resourcesList.find(x => x.Type == value).Sizes != undefined && this.resourcesList.find(x => x.Type == value).Sizes.length > 0) {
      this.resourceDetails[i].Sizes = this.resourcesList.find(x => x.Type == value).Sizes;
    }
    else {
      this.resourceDetails[i].Sizes = [];
      this.resourceDetails[i].ResourceSize = "N/A";
      this.resourceDetails[i].SizeDescription = "N/A";
    }
  }
  GetResourceSizeDescription(value, i) {
    debugger;
    this.resourceDetails[i].SizeDescription = this.resourcesList.find(x => x.Type == this.resourceDetails[i].ResourceType).Sizes
      .find(size => size.Size == value).Description;
    if (this.resourceDetails[i].SizeDescription == undefined)
      this.resourceDetails[i].SizeDescription = "";
    else {
      this.pricingService.GetpricingDetails(this.resourceDetails[i].ResourceType, this.resourceDetails[i].SizeDescription, this.projectDetails.DeploymentRegion).subscribe(res => {
        this.resourceDetails[i].Price = res;// console.log(res);
      }
      );
    }

  }
  Delete(i) {
    this.resourceDetails.splice(i, 1);
  }
  SubmitClick() {
    debugger;
    this.projectDetails.ProjectResources = this.resourceDetails;
    let formData: FormData = new FormData();
    formData.append("ProjectDetails", JSON.stringify(this.projectDetails));
    this.pricingService.SaveProjectDetails(formData).subscribe(res => {
      console.log(res.json());
    });

  }
}
