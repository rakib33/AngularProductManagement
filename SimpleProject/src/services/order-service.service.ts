import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { globalConstant } from '../Model/appVariable';
import {SelectList,kiniOrder} from '../Model/ViewModel';
import { data } from 'jquery';
import { Observable ,throwError } from 'rxjs';
import { catchError,map,filter,tap } from 'rxjs/operators';

import { Catagory , CatagoryResponse, Invoice } from '../Model/Category';



@Injectable({
  providedIn: 'root'
})
//https://www.itsolutionstuff.com/post/angular-http-post-request-exampleexample.html
export class OrderService {
  private url = globalConstant.BaseUrl + 'SaveOrder'
   
  constructor(private httpClient: HttpClient) { }
  
  getPosts(){
    return this.httpClient.get(this.url);
  }
  

  getInvoiceList(): Observable<CatagoryResponse>{
    let getUrl = globalConstant.BaseUrl + 'GetOrderInvoice';
    return this.httpClient.get<CatagoryResponse>(getUrl);
    // .pipe(
    //           tap(data => console.log('All: ' + JSON.stringify(data))),
    //           catchError(this.handleError)              
    //       );
  }

  
private handleError(err: HttpErrorResponse) {
  debugger;
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}


  SubmitTransaction(model: Invoice): Observable<any> {
    let getUrl = globalConstant.BaseUrl + 'SaveOrder';
    let headers:{
        'content':'application/json',
        'content-type':"application/x-www-form-urlencoded"
      }
    return this.httpClient.post<any>(getUrl, model, 
    {headers})
      .pipe(
        catchError(error => throwError(error.message || 'Server Error'))
      );
  }
  SavePayment(model: Invoice): Observable<any> {
    let getUrl = globalConstant.BaseUrl + 'PaymentOrder';
    let headers:{
        'content':'application/json',
        'content-type':"application/x-www-form-urlencoded"
      }
    return this.httpClient.post<any>(getUrl, model, 
    {headers})
      .pipe(
        catchError(error => throwError(error.message || 'Server Error'))
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }

}
