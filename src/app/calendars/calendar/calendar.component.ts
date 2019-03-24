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


    // public scrollToMonth (month: number): void {
    //     const thisMonth: string = MonthsOfYear[month].toLowerCase();
    //     $('.innerCalendarContainer').animate(
    //         { scrollTop: $('#scroll-' + thisMonth).offset().top - 100 }
    //         , 1000);

    //         this.selectedMonth = month + 1;
    //         console.log($('#scroll-' + thisMonth).offset().top - 100 );
    // }


    public scrollToMonth (month: number): void {

        const thisMonth: string = MonthsOfYear[month].toLowerCase();

        const calContainerHeight = $('#scroll-january').height();

        $('.innerCalendarContainer').animate(
            { scrollTop: calContainerHeight * (month - 1) }
            , 1000);

            this.selectedMonth = month + 1;
            console.log($('#scroll-' + thisMonth).offset().top - 100 );
    }



    ngOnInit() {
        setTimeout(() => {
            this.scrollToMonth(new Date().getMonth() + 1);

        Array
         .from({length: 12})
         .map((j, i) =>  i + 1 )
         .forEach((k, u) => {
            console.log(
                'offset: ' + $('#scroll-' + MonthsOfYear[k].toLowerCase()).offset().top
                );
                console.log(
                    'position: ' + $('#scroll-' + MonthsOfYear[k].toLowerCase()).position().top
                    );
        });

        }, 400);

    }
}
