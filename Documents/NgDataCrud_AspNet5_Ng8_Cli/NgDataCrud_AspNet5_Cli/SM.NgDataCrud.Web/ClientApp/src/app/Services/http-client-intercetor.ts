import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable()
export class httpClientIntercetor implements HttpInterceptor {    
    //private subscription: Subscription;    
    //private name = 'httpCeptor'

    constructor(private messageService: MessageService) {
        //For registering receiving message.
        //this.subscribe();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        this.messageService.broadcast('showAjaxLoader', true);
        return next.handle(req).pipe(
            tap(event => {                
                if (event instanceof HttpResponse) {                    
                    this.messageService.broadcast('showAjaxLoader', false);
                }
            },
            (error) => {
                this.messageService.broadcast('showAjaxLoader', false);
            })
        );
    } 

    //subscribe() {
    //    this.subscription = this.messageService.subscribe('httpCeptor', (eventData) => {
    //        //Do with eventData...
    //    });
    //}
    //unsubscribe() {
    //    this.subscription.unsubscribe();
    //}
}
