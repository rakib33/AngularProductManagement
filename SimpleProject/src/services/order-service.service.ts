import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { globalConstant } from '../Model/appVariable'
import {kiniOrder} from '../Model/ViewModel'
import { Observable ,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



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
  
  create(postData){
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    var body = {  
      model:postData
               } 
    return this.httpClient.post(this.url, body, {headers});
  }  


//   SubmitTransaction(model: kiniOrder): Observable<any> {
//  let headers:{
//     'content':'application/json',
//     'content-type':"application/x-www-form-urlencoded"
//   }
//     return this.httpClient.post<any>('http://localhost:55171/kiniApi/SaveOrderTest', model, 
//     {headers})
//       .pipe(
//         catchError(error => throwError(error.message || 'Server Error'))
//       );
//   }
//   errorHandler(error: HttpErrorResponse) {
//     return throwError(error.message || "server error.");
//   }

  // createTest2(){   
  //   let kiniOrder = {"Total":"10"};
  //   return this.httpClient.post('http://localhost:55171/kiniApi/PostOrder',JSON.stringify({Total:10}));
  // }

}
