import { Component, Input, OnInit } from '@angular/core';
import { CalendarConfig } from './../metadata/calendarConfig';

@Component({
  selector: 'app-calendar2',
  templateUrl: './calendar2.component.html',
  styleUrls: ['./calendar2.component.css']
})
export class Calendar2Component implements OnInit {

    constructor() { }
    ngOnInit() {
//     setTimeout(function() {
//         const thisMonth = MonthsOfYear[new Date().getMonth() + 1].toLowerCase();
//         console.log($('#scroll-' + thisMonth));
//         if ($('.innerCalendarContainer').length) {
//             $('.innerCalendarContainer').animate({
//                 scrollTop: $('#scroll-' + thisMonth).offset().top
//             }, 400);
//         }
//      }, 100);
    }

}
