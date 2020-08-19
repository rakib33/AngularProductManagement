import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { globalConstant } from '../Model/appVariable';
import {SelectList,kiniOrder} from '../Model/ViewModel';
import { data } from 'jquery';
import { Observable ,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import 'url-search-params-polyfill';

@Injectable({
  providedIn: 'root'
})
//https://www.itsolutionstuff.com/post/angular-http-post-request-exampleexample.html
export class OrderService {
  private url = globalConstant.BaseUrl + 'SaveOrder'
  //'http://jsonplaceholder.typicode.com/posts';
   
  constructor(private httpClient: HttpClient) { }
  
  getPosts(){
    return this.httpClient.get(this.url);
  }
  
  create(post){
    const options = {
      responseType: 'json' as const,
    };   
    debugger;
    return this.httpClient.post(this.url, JSON.stringify(post));
  }  

  //Headers:new HttpHeaders({'Content-Type':'application/json' }
  // createTest(_kiniOrder: kiniOrder): Observable<AnyNsRecord>{  
  // return this.httpClient.post<kiniOrder>('http://localhost:55171/kiniApi/SaveOrderTest', _kiniOrder}).pipe(catchError(this.handleError));

  // }
  // handleError(handleError: any): import("rxjs").OperatorFunction<ArrayBuffer, kiniOrder> {
  //   throw new Error("Method not implemented.");
  //  // return throw Error(error.message || "server error.");
  // }

  SubmitTransaction(model: kiniOrder): Observable<any> {
  //   let options = {
  //     headers: new HttpHeaders().set( 'Content-Type', 'application/x-www-form-urlencoded')
  //    new HttpHeaders().set( 'content':'application/json')
  // };

 let headers:{
    'content':'application/json',
    'content-type':"application/x-www-form-urlencoded"
  }
 //  let data = {"Total":"10"}
   //JSON.stringify(transactionRequest);
  //{ headers: new HttpHeaders().set('Accept', 'application/json') }
    return this.httpClient.post<any>('http://localhost:55171/kiniApi/SaveOrderTest', model, 
    {headers})
      .pipe(
        catchError(error => throwError(error.message || 'Server Error'))
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }

  createTest2(){   
    let kiniOrder = {"Total":"10"};
    return this.httpClient.post('http://localhost:55171/kiniApi/SaveOrderTest2',JSON.stringify({Total:10}));
  }

}
