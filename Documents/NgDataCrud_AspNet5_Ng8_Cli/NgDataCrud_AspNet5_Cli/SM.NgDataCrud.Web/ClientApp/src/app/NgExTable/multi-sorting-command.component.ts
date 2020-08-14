import {
    Component, ViewChild, ElementRef, Input, OnInit, Output, EventEmitter, Renderer2
} from '@angular/core';
import { TableMainDirective } from './table-main.directive';
import { NgExTableConfig } from './ngex-table.config';
import { PagingParams, SortableItem, SortItem, NameValueItem } from './model-interface';
import { TableChange } from './constants';

@Component({
    moduleId: module.id.toString(),
    selector: 'multi-sort-command',
    templateUrl: "./multi-sorting-command.component.html",
    styleUrls: ["./multi-sorting-command.component.css"]    
})
export class MultiSortingCommandComponent implements OnInit {
    config: any;
    showMultiSortPanel: boolean = false;

    constructor(private ngExTableConfig: NgExTableConfig, private tableMainDirective: TableMainDirective,
        private renderer: Renderer2) {
        let pThis: any = this;
        //Called from TableMainDirective to open this panel.
        this.tableMainDirective.multiSortCommandComponent$.subscribe(
            (subjectParam: NameValueItem) => {
                if (subjectParam.name == "setShowMultiSortPanelFlag") {
                    //subjectParam.value: true or false.
                    pThis.showMultiSortPanel = subjectParam.value;
                }
                else if (subjectParam.name == "getShowMultiSortPanelFlag") {                    
                    subjectParam.value = pThis.showMultiSortPanel;
                }
            }
        );
    }  

    ngOnInit(): void {
        this.config = this.ngExTableConfig.main;                          
    }

    sortOk() {
        this.tableMainDirective.submitMultiSortAction();
        this.showMultiSortPanel = false;
    }

    cancel() {
        this.tableMainDirective.cancelMultiSortAction();
        this.showMultiSortPanel = false;
    }

    clear() {
        this.tableMainDirective.clearMultiSortings();
        this.showMultiSortPanel = false;
    }

    toSingleColumnSorting() {
        //In Ctrl/Shift key mode, switch to 'single' needs to save result status for cancel operation
        //in case doing 'multiple' later so that call method in tableMainDirective to process details.
        this.tableMainDirective.toSingleColumnSorting_S1();        
    }
}
