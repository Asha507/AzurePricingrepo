import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { ResourceType, ResourceSizes } from 'src/app/ResourceType';
import { ProjectDetails } from './ProjectDetails';
import { ResourceDetails } from './ResourceDetails';
import { PricingService } from '../services/pricing-service.service';
import { EnvironmentTypes } from '../Environment.Types';
import { DurationsList } from '../DurationsList';
import { Regions } from '../Regions';
import { ConcurrentUsers } from '../ConcurrentUsers';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css']
})
export class ProjectdetailsComponent implements OnInit {
  resourcesList: Array<ResourceType>;
  projectDetails: ProjectDetails;
  resourceDetails: Array<ResourceDetails> = [];
  environments: Array<EnvironmentTypes>;
  durations: Array<DurationsList>;
  deploymentRegions: Array<Regions>;
  concurrentUsers: Array<ConcurrentUsers>;
  totalCost: number = 0;
  isRegionSelected=false;
  constructor(private resourcesService: ResourcesService, private pricingService: PricingService) { }

  ngOnInit() {

    this.projectDetails = new ProjectDetails();
    this.projectDetails.CreatedOn = new Date().toLocaleDateString();
    this.projectDetails.Environment = "Select";
    this.projectDetails.CostingEstimation = 0;
    this.projectDetails.ProjectResources = this.resourceDetails;
    this.addNewResource();
    this.resourcesService.getJSONData("Environments.json").subscribe(res => {
      this.environments = res.Environment;
    });
    this.resourcesService.getJSONData("Resources.json").subscribe(data => {
      this.resourcesList = data.Resource;
    });
    this.resourcesService.getJSONData("Durations.json").subscribe(res => {
      this.durations = res.DurationsList;
    });
    this.resourcesService.getJSONData("Regions.json").subscribe(res => {
      this.deploymentRegions = res.Region;
    });
    this.resourcesService.getJSONData("ConcurrentUsers.json").subscribe(res => {
      this.concurrentUsers = res.ConcurrentUser;
    });
  }

  addNewResource() {
    this.resourceDetails.push(
      { ResourceType: 'Select', ResourceSize: 'Select', SizeDescription: '', Price: '0', Sizes: [] }
    );
  }
  GetResourceSizes(value, i) {
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
    this.resourceDetails[i].SizeDescription = this.resourcesList.find(x => x.Type == this.resourceDetails[i].ResourceType).Sizes
      .find(size => size.Size == value).Description;
    if (this.resourceDetails[i].SizeDescription == undefined)
      this.resourceDetails[i].SizeDescription = "";
    else {
      if(this.projectDetails.DeploymentRegion !== "Select")
      {
        this.isRegionSelected=true;
      this.pricingService.GetpricingDetails(this.resourceDetails[i].ResourceType, this.resourceDetails[i].SizeDescription, this.projectDetails.DeploymentRegion).subscribe(res => {
        this.resourceDetails[i].Price = res;
        this.projectDetails.CostingEstimation = this.projectDetails.CostingEstimation + (+res);
        // console.log(res);
      }
      );
    }
    else{
      this.isRegionSelected=false;
    }
    }

  }
  Delete(i) {
    debugger;
    let cost = this.resourceDetails[i].Price;
    this.resourceDetails.splice(i, 1);
    this.projectDetails.CostingEstimation = this.projectDetails.CostingEstimation - (+cost);
  }
  ResetResourceCosting() {
    this.projectDetails.CostingEstimation = 0;

    this.resourceDetails.forEach(resource => {
      if (resource.ResourceType != "Select" && (resource.SizeDescription != "Select")) {
        this.pricingService.GetpricingDetails(resource.ResourceType, resource.SizeDescription,
          this.projectDetails.DeploymentRegion).subscribe(res => {
            resource.Price = res;
            this.projectDetails.CostingEstimation = this.projectDetails.CostingEstimation + (+res);
          });
      }
      else
      {
        resource.Price="0";
      }
    });


  }
  SubmitClick() {
    this.projectDetails.ProjectResources = this.resourceDetails;
    let formData: FormData = new FormData();
    formData.append("ProjectDetails", JSON.stringify(this.projectDetails));
    this.pricingService.SaveProjectDetails(formData).subscribe(res => {
      alert("Successfully submitted , your estimation id is " + res);
    });

  }
}
