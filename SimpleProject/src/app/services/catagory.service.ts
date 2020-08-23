import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { globalConstant } from '../../Model/appVariable';
import { data } from 'jquery';
import { Observable ,throwError , range} from 'rxjs';
import { catchError, map,filter,tap } from 'rxjs/operators';
import {Catagory ,CatagoryResponse} from '../../Model/Category';
import { CategoryComponent } from '../category/category.component';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {
  constructor(private httpClient: HttpClient) { }
  
  getCategoryList(): Observable<CatagoryResponse>{
    let getUrl = globalConstant.BaseUrl + 'GetCategory';
    //return this.httpClient.get(getUrl); 
  
    return this.httpClient.get<CatagoryResponse>(getUrl).pipe(
              tap(data => console.log('All: ' + JSON.stringify(data))),
              catchError(this.handleError)
          );
  }

private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}



  SubmitTransaction(model: any): Observable<any> {
    let postUrl = globalConstant.BaseUrl + 'SaveUpdateCategory';
    let headers:{
      'content':'application/json',
      'content-type':"application/x-www-form-urlencoded"
    }
    return this.httpClient.post<any>(postUrl, model, 
    {headers})
      .pipe(
        catchError(error => throwError(error.message || 'Server Error'))
      );
  }

}
