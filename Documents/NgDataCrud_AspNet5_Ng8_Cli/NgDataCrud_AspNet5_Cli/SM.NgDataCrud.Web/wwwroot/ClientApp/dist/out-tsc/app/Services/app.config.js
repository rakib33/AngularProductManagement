export var WebApiRootUrl = 'http://localhost:6300/api/'; //IIS Express Core 3.0
//export const WebApiRootUrl: string = 'http://localhost:5112/api/';  //IIS Express Core 2.2
//export const WebApiRootUrl: string = 'http://localhost:20422/api/'; //IIS Express Web API 2.0
//export const WebApiRootUrl: string = 'http://localhost/storecoreservice/api/'; //Local IIS
export var ApiUrl = {
    getProductList: WebApiRootUrl + "getpagedproductlist",
    //getProductList: WebApiRootUrl + "getpagedproductlistbysp", //Or use this for calling stored procedure.
    getCategory: WebApiRootUrl + "lookupcategories",
    getStatusTypes: WebApiRootUrl + "lookupproductstatustypes",
    getProduct: WebApiRootUrl + "products",
    updateProduct: WebApiRootUrl + "updateproduct",
    addProduct: WebApiRootUrl + "addproduct",
    deleteProducts: WebApiRootUrl + "deleteproducts",
    getContactList: WebApiRootUrl + "getcontactlist",
    addContacts: WebApiRootUrl + "addcontacts",
    updateContacts: WebApiRootUrl + "updatecontacts",
    deleteContacts: WebApiRootUrl + "deletecontacts"
};
export var MiscConfig = {
    maxAddProductPerLoad: 3,
    maxAddContactPerLoad: 5
};
//Merge to NgExTableConfig in AppComponent and take settings here as precedence.
//Remove or comment out item for using default setting.
export var TableConfig = {
    //pageSize: 10, /* number: number of rows per page */
    toggleWithOriginalDataOrder: true,
    //previousText: "&laquo;", /*string: page previous button label. Could be "PREV" */
    //nextText: "&raquo;", /*string: page next button label. Could be "NEXT" */
    //paginationMaxBlocks: 5, /* number: maximum number of page number buttons if "..." shown on both sides */
    //paginationMinBlocks: 2,  /* number: minimum number of page number buttons if "..." shown on both sides */
    pageNumberWhenPageSizeChange: -1,
    pageNumberWhenSortingChange: 1,
    sortingWhenPageSizeChange: "current",
    //Related to data search (no default setting in library-level, NgExTableConfig base).
    //-------------------------------
    pageNumberWhenSearchChange: 1,
    sortingWhenSearchChange: "",
};
export var PageSizeList = [
//{ value: 5, text: "5" },
//{ value: 10, text: "10" },
//{ value: 25, text: "25" },
//{ value: 50, text: "50" },
//{ value: 100, text: "100" },
//{ value: -1, text: "ALL" }
];
export var DialogConfig = {
    //Please see properties of calling parameter object in dialog.component.ts.
    //App level settings ----------------
    topOffset: 50,
    draggable: true,
    moveCursor: "default",
    //Animation fade-in time is set in bootstrap.css by default (0.3s).
    //You can overwrite the value in dialog-main.component.css.
    animation: true,
    //Dialog level settings --------------------
    //Background color can also be set in dialog-main.component.css.
    grayBackground: true,
    width: "40%",
    //Animation fade-out time in milliseconds.
    closeDelay: 400,
    //Fade-out time delay in milliseconds for multiple parent dialogs when closing all together.
    closeDelayParent: 10,
    closeByEnter: false,
    closeByEscape: true,
    closeByClickOutside: true,
    //Usually dialog-level only:
    closeAllDialogs: false,
    closeImmediateParent: false,
    keepOpenForAction: false,
    keepOpenForClose: false,
    //Dialog-level exclusive, no default set but listed here for reference.
    //beforeActionCallback: undefined,
    //beforeCloseCallback: undefined,
    //Default values for predefined base type dialogs (message or confirm) only:
    messageTitle: "Information",
    confirmTitle: "Confirmation",
    //Two kinds of button labels in Parameter object for Opening dialog are:
    //actionButtonLabel
    //closeButtonLabel
    //These are for setting defaults only. If passed from parameter object, use these:
    //actionButtonLabel
    //closeButtonLabel
    //--------------------------------------------------------------------
    //Only single button should be used for basic message dialog, which uses close button pattern by default.
    //Switch to use action button pattern will change button CSS style and set Observable.result = true.
    messageActionButtonLabel: "",
    messageCloseButtonLabel: "OK",
    confirmActionButtonLabel: "Yes",
    confirmCloseButtonLabel: "No",
    //End for setting defaults only----------------------------------------
    showIcon: true,
    messageIcon: "info",
    confirmIcon: "question",
};
export var MyDatePickConfig = {
    dateFormat: 'mm/dd/yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: false,
    markCurrentDay: true,
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    minYear: 1970,
    maxYear: 2200,
    showSelectorArrow: false,
    monthSelector: true,
    yearSelector: true,
    satHighlight: false,
    highlightDates: [],
    disableDates: [],
    disableHeaderButtons: true,
    showWeekNumbers: false,
    disableDateRanges: [],
    markDates: [],
    markWeekends: {},
    selectorHeight: '230px',
    selectorWidth: '250px',
    closeSelectorOnDateSelect: true,
    closeSelectorOnDocumentClick: true,
    allowSelectionOnlyInCurrentMonth: true,
    appendSelectorToBody: true
};
//# sourceMappingURL=app.config.js.map