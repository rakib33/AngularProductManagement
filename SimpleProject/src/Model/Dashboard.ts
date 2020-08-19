export class Dashboard {
    TotalRevenue: number ;
    TotalProduct: number;
    TotalOrder: number;
    LowCost: number;
    SelectedDate: Date;
    constructor(){
        this.TotalOrder = 0;
        this.TotalRevenue = 0;
        this.TotalProduct = 0;
        this.LowCost = 0;
    }
}