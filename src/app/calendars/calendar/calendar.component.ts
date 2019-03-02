import { Component, Input, OnInit } from '@angular/core';
import { CalendarConfig } from './../metadata/calendarConfig';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { DaysOfTheWeek, MonthsOfYear } from './../../enums/calendarEnums';
declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

    calendarMetadata: any = new CalendarConfig(new Date('2019-1-1'), 'calendar2').makeCalendarConfig();
    daysOfWeek: Array<any> = Array.from({length: 7}).map((j, i) =>  DaysOfTheWeek[i + 1] );

    ngOnInit() {
        setTimeout(function() {
            const thisMonth = MonthsOfYear[new Date().getMonth() + 1].toLowerCase();
            console.log($('#scroll-' + thisMonth));
            if ($('.innerCalendarContainer').length) {
                $('.innerCalendarContainer').animate({
                    scrollTop: $('#scroll-' + thisMonth).offset().top
                }, 400);
            }
         }, 100);
    }
}
