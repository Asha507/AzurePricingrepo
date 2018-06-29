import { ResourceDetails } from "./ResourceDetails";

export class ProjectDetails
{
    Client_Account:string;
    Project:string;
    Product:string;
    CreatedOn:string;
    ProjectManager:string;
    PM_EmailID:string;
    SizingBy:string;
    SDB_EmailID:string;
    QuotationDoneBy:string;
    QDB_EmailID:string;
    CostingEztimation:number;
    Environment:string;
    ConcurrentUserCount:Number;
    DeploymentRegion:string;
    Duration:string;
    ProjectResources:ResourceDetails[];
}