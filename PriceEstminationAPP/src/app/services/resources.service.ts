import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient) {
}
public getJSONData(filename): Observable<any> {
  return this.http.get("./assets/"+filename)
}

public getProjectDetailsByID(id):Observable<any>
{
  return this.http.get(environment.api+"/api/pricing/GetEstimationsByID?id="+id);
}

public getProjectDetailsByEmail(email):Observable<any>
{
  return this.http.get(environment.api+"/api/pricing/GetEstimationsByEmail?Email="+email);
}

public getProjectDetailsByClient(client):Observable<any>
{
  return this.http.get(environment.api+"/api/pricing/GetEstimationsByClient?client="+client);
}

}
