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

    calendarMetadata: any = new CalendarConfig(
        new Date('2019-1-1'), true).makeCalendarConfig();
    daysOfWeek: Array<any> = Array.from({length: 7}).map((j, i) =>  DaysOfTheWeek[i + 1]);

    selectedMonth: number = null;

    public scrollToMonth (month: number): void {

        let scrollDistance = 0;
        for (let i = 1; i < month; i++) {
            scrollDistance = scrollDistance + $('#scroll-' + MonthsOfYear[i].toLowerCase()).height();
        }
        $('.innerCalendarContainer').animate(
            { scrollTop: scrollDistance }
            , 1000);
            this.selectedMonth = month + 1;
    }

    ngOnInit() {
        setTimeout(() => {
            this.scrollToMonth(new Date().getMonth() + 1);
        }, 400);

    }
}
