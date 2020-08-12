import { Component, OnInit } from '@angular/core';
//import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
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
  DashBoardAPI = globalConstant.BaseUrl + 'KiniApi/GetDashBoardData';
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
    //alert('date click! ' + arg.dateStr)
    this.CurrentDate = arg.dateStr
    //document.getElementById('DateId').innerHTML = arg.dateStr;
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
      
  }

  GetDashboardData(selectedDate)  {
     //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
     const body = { selectedDate: selectedDate }
     //const body=JSON.stringify(person);
    //  //HttpContext.Response.AppendHeader("Access-Control-Allow-Origin", "*");
    //  const headers = new HttpHeaders()
    //  .append('Content-Type', 'application/json')
    //  .append('Access-Control-Allow-Headers', 'Content-Type')
    //  .append('Access-Control-Allow-Methods', 'GET')
    //  .append('Access-Control-Allow-Origin', '*');
     const headers = {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' }
     this.http.post<Dashboard>(this.DashBoardAPI, body,{headers}).subscribe(data => {
       this.dashBoard = data;
    })
        
    console.log(this.dashBoard);
    // this.http.post<any>('https://jsonplaceholder.typicode.com/posts', body, { headers }).subscribe(data => {
    //   this.postId = data.id;
    //  })
  }
 
}
