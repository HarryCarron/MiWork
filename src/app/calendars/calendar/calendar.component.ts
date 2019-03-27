import { Component, Input, OnInit } from '@angular/core';
import { CalendarConfig } from './../metadata/calendarConfig';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { DaysOfTheWeek, MonthsOfYear } from './../../enums/calendarEnums';
import { CalendarTools } from './../../masterServices/master.service';
declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

    calendarMetadata: any = new CalendarConfig(new Date('2019-1-1'), true).makeCalendarConfig();
    daysOfWeek: Array<any> = Array.from({length: 7}).map((j, i) =>  DaysOfTheWeek[i + 1]);

    selectedMonth: number = null;

    public cellStyle(index: number) {
        if (index === 0) {
            return {'borderLeft': 'none'};
        } else if ([5, 6].indexOf(index) !== -1) {
            return {
                'backgroundColor': '#f3f3f336',
                'color': '#bbb'
            };
        }
    }

    public cellBackground (index: number, day: any) {
        if ([5, 6].indexOf(index) !== -1) {
            return 'weekend';
        } else if (day.isColspan) {
            return 'colspanCell';
        }
    }

    public scrollToMonth (month: number): void {

        this.selectedMonth = month;
        let scrollDistance = 0;
        for (let i = 1; i < month; i++) {
            scrollDistance = scrollDistance + $('#scroll-' + MonthsOfYear[i].toLowerCase()).height();
        }
        $('.innerCalendarContainer').animate(
            { scrollTop: scrollDistance }
            , 1000);
    }

    ngOnInit() {

    }
}
