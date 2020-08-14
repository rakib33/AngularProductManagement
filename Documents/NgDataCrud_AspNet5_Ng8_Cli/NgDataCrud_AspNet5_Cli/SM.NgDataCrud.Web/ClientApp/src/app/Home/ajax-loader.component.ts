import { Component, HostListener, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../Services/message.service';
import { Subscription } from 'rxjs';

@Component({    
    moduleId: module.id.toString(),
    selector: 'ajax-loader',
    template: `<div class="loader-div" *ngIf="showLoader">
            <img src="assets/images/animatedCircle.gif" class="ajax-loader" />
        </div>  `    
})
export class AjaxLoaderComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    showLoader: boolean = false;
    constructor(private messageService: MessageService) {        
    }

    ngOnInit() {
        this.subscribe();
    }
    
    ngOnDestroy() {
        this.unsubscribe();
    }

    subscribe() {
        let pThis: any = this;
        this.subscription = this.messageService.subscribe('showAjaxLoader', (eventData) => {
            pThis.showLoader = eventData;
        });
    }

    unsubscribe() {
        this.subscription.unsubscribe();
    }
}
