import { Component, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';
import { NgExTableConfig } from './ngex-table.config';
import { TableMainDirective } from './table-main.directive';
import { NameValueItem } from './model-interface';

@Component({
    moduleId: module.id.toString(),
    selector: 'options',
    templateUrl: "./options.component.html",
    styleUrls: ["./options.component.css"]
})
export class OptionsComponent implements OnInit {     
    config: any;
    enableOptionBoard: boolean;
    showOptionBoardContent: boolean;
    showSortingOptions: boolean;
    optionToggleHint: string;
    sortingOption: string; //ngModel for dropdown. 
    showGroupingLines: boolean;    
    showGroupingLines_0: string;

    @Output() optionChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor(private ngExTableConfig: NgExTableConfig, private tableMainDirective: TableMainDirective, 
        private renderer: Renderer2) {        
    }

    ngOnInit(): void {
        this.config = this.ngExTableConfig.main; 
        this.enableOptionBoard = this.tableMainDirective.enableOptionBoard == 'yes' ? true : false;
        this.showOptionBoardContent = this.tableMainDirective.showOptionBoardContent == 'yes' ? true : false;           
        
        if (this.tableMainDirective.sortingRunMode == 1) {
            if (this.tableMainDirective.sortingTypeSwitch == 0) {
                this.showSortingOptions = true;
            }
            else {
                this.showSortingOptions = false;
                //Hide option board by default for crtl-key type. 
                this.showOptionBoardContent = false;
            }
            this.sortingOption = this.tableMainDirective.sortingOption;
        }
        else {
            this.showSortingOptions = false;
        }        
        
        this.showGroupingLines = this.tableMainDirective.showGroupingLines == 'yes' ? true : false;
        this.toggleOptionLinkHint();
    }

    onSortingOptionChange($event: any) {
        this.tableMainDirective.sortingOption = this.sortingOption;        
        this.tableMainDirective.switchSortingOption();
        
        ////Auto close option board.
        //this.showOptionBoardContent = true;
        //this.toggleOptionLinkHint();
    }

    onShowGroupingLinesChange($event: any) {
        if (this.showGroupingLines) {
            this.tableMainDirective.showGroupingLines = 'yes';
        }
        else {
            this.tableMainDirective.showGroupingLines = 'no';
        }

        //Reload data to grid if set row group lines.
        if (this.tableMainDirective.showGroupingLines != this.showGroupingLines_0) {           
            this.showGroupingLines_0 = this.tableMainDirective.showGroupingLines;
            this.optionChanged.emit('grouping');
        }        
    }

    toggleOptions($event: any) {             
        this.showOptionBoardContent = !this.showOptionBoardContent;
        this.toggleOptionLinkHint();
    }

    toggleOptionLinkHint() {
        if (this.showOptionBoardContent) {
            this.optionToggleHint = 'Click to show Option Board';
        }
        else {
            this.optionToggleHint = 'Click to hide Option Board';
        }
    }
}
