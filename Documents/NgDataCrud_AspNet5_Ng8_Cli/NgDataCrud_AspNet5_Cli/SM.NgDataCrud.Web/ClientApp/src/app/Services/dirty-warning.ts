import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ExDialog } from "../NgExDialog/dialog.module";
import * as glob from './globals';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class DirtyWarning implements CanDeactivate<ComponentCanDeactivate> {
    constructor(
        private exDialog: ExDialog
    ) { }

    canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
        // if there are no pending changes, just allow deactivation; else confirm first
        let rtn = component.canDeactivate();
        if (rtn) {
            //Close any Angular dialog if opened.
            if (this.exDialog.hasOpenDialog()) {
                this.exDialog.clearAllDialogs();
            }            
            glob.caches.pageDirty = false;
        }
        else {
            if (window.confirm("WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to ignore these changes.")) {
                //Close any Angular dialog if opened.
                if (this.exDialog.hasOpenDialog()) {                                
                    this.exDialog.clearAllDialogs();                                
                }                
                glob.caches.pageDirty = false;
                rtn = true;
            }
            else {
                //Cancel leaving action and stay on the page.
                rtn = false;                            
            }
        }
        return rtn;        
    }
}