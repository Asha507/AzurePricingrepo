import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient) {
}
public getJSONData(filename): Observable<any> {
  return this.http.get("./assets/"+filename)
}

// public getEnvironmentsJson():Observable<any>
// {
//   return this.http.get("./assets/Environments.json")
// }

}
