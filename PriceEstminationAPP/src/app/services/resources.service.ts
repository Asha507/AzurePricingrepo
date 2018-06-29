import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient) {
}
public getJSON(): Observable<any> {
  return this.http.get("./assets/Resources.json")
}
}
