import { Component, Input, OnInit } from '@angular/core';
import { CalendarConfig } from './../metadata/calendarConfig';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { DaysOfTheWeek, MonthsOfYear } from './../../enums/calendarEnums';
import { CalendarTools } from './../../masterServices/master.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {TrayComponent} from './tray/tray.component';

declare var $: any;


export interface CellData {
    assignments: any[];
    holidayInfo: any;
    int: any;
    isColspan: boolean;
    isSelected: boolean;
    isweekend: boolean;
    standardisedDate: string;
    string: any;
}

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
  })

export class CalendarComponent implements OnInit {

    calendarConfig: any = new CalendarConfig(new Date('2019-1-1'), true);
    calendarMetadata: any = null;
    daysOfWeek: any[] = Array.from({length: 7}).map((j, i) =>  DaysOfTheWeek[i + 1]);
    drawerState: boolean;
    private currentlyActiveCell: CellData;

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
        if (day.holidayInfo.title || [5, 6].indexOf(index) !== -1) {
            return 'dayOff';
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
            , 300);
    }

    public cellClicked(cell: CellData): void { // todo: assign only unique cell ID
        if (this.currentlyActiveCell) {
            if (this.currentlyActiveCell.standardisedDate !== cell.standardisedDate) {
                this.drawerState = true;
                this.currentlyActiveCell = cell;
            } else {
                this.drawerState = false;
                this.currentlyActiveCell = null;
            }
        } else {
            this.drawerState = true;
            this.currentlyActiveCell = cell;
        }
    }
    ngOnInit() {
        this.calendarConfig.getHolidays().then((res: any) => {
            this.calendarMetadata = this.calendarConfig.addHolidaysToMetadataAndOutput(res);
        }, (err: any) => {
            console.log('Holiday dates not loaded: Server did not respond!');
            this.calendarMetadata = this.calendarConfig.makeCalendarConfig();
        });
    }
}
