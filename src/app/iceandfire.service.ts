import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {forkJoin} from 'rxjs'; 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class IceandfireService {

  constructor(private _http:HttpClient) {
    
   }

public books;
public houses;
  public baseUrl='https://anapioficeandfire.com/api/';


  public  getDetails = (input:string):any =>{

    
    return this._http.get(this.baseUrl+input);

  }

public getSingleDetails =(url:string):any =>{

  return this._http.get(url);
}

  public getAllBlogs = (): any => {

    
    //let myReponse= this._http.get();
    //this._http.get(this.baseUrl);
     return forkJoin(
      this._http.get(this.baseUrl+'/books'),
      this._http.get(this.baseUrl+'/characters?'),
      this._http.get(this.baseUrl+'/houses')

  );

  }

}
