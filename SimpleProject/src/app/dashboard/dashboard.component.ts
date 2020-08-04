import { Component, OnInit } from '@angular/core';
//import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

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
    document.getElementById('DateId').innerHTML = arg.dateStr;
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
  
}
