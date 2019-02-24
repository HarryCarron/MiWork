import { Component, Input, OnInit } from '@angular/core';
import { CalendarConfig } from './metadata/calendarConfig';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { DaysOfTheWeek } from './metadata/enums/calendarEnums';
import { MonthsOfYear } from './metadata/enums/calendarEnums';
declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
    // @Input() metadata: Array<any>;
    daysOfWeek: Array<any> = Array.from({length: 7}).map(function(j, i) { return DaysOfTheWeek[(i + 1)]; });
    calendarMetadata: any = new CalendarConfig();
    calendarConfig: any = this.calendarMetadata.makeYearObject();

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
