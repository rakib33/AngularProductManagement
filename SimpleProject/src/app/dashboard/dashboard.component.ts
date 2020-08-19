import { Component, OnInit } from '@angular/core';
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalConstant } from '../../Model/appVariable';
import { Dashboard } from '../../Model/Dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  dashBoard = {};
  CurrentDate = Date.now();
  DashBoardAPI = globalConstant.BaseUrl + 'GetDashBoardData';
  constructor(private http: HttpClient) { 
    this.dashBoard = new Dashboard();
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  handleDateClick(arg) {
    console.log(arg.dateStr);
    this.CurrentDate = arg.dateStr
    this.GetDashboardData(this.CurrentDate);
  }

  highlightedDiv: number;

  toggleHighlight(newValue: number) {
    console.log("ok");
    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
    }
    else {
      this.highlightedDiv = newValue;
    }
  }

  ngOnInit(): void {
      this.GetDashboardData(this.CurrentDate);
  }

  GetDashboardData(selectedDate)  {
     //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
     const body = { selectedDate: selectedDate }
     const headers = {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' }
     this.DashBoardAPI += "?selectedDate="+selectedDate
	
																							 
     this.http.get<any>(this.DashBoardAPI).subscribe(res => {
       let Data = res;
        if(res.IsSuccess == true){
          this.dashBoard = res.data;
          alert('Success');
        }else{
          alert(res.message);
        }
       console.log('fromGet',this.dashBoard);
    })
  } 
}
