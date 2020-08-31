import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { globalConstant } from '../Model/appVariable';
import {SelectList,kiniOrder} from '../Model/ViewModel';
import { data } from 'jquery';
import { Observable ,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Invoice } from 'src/Model/Category';

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

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }

  createTest2(){   
    let kiniOrder = {"Total":"10"};
    return this.httpClient.post('http://localhost:55171/kiniApi/SaveOrderTest2',JSON.stringify({Total:10}));
  }

}
