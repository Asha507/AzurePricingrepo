import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private httpclient:HttpClient) { }

  SaveProjectDetails(formData):Observable<any>
  {
    return this.httpclient.post(environment.api+"api/Pricing/SavePricingData",formData);
  }

  GetpricingDetails(category,subCategory,region):Observable<any>
  {
    return this.httpclient.get(environment.api+"api/Pricing/GetPrice?Category="+category+"&SubCategory="+subCategory+"&Region="+region);
  }

}
