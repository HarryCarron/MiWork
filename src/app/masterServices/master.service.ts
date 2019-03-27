import { Injectable } from '@angular/core';
import { MonthsOfYear } from '../enums/calendarEnums';

@Injectable({
  providedIn: 'root'
})

export class MasterService {

    constructor() { }

}

export class CalendarTools {

    constructor() { }

    static todaysIntMonth(): number {
        return new Date().getMonth() + 1;
    }

    static todaysStringMonth(): string {
        console.log(MonthsOfYear[new Date().getMonth() + 1]);
        return MonthsOfYear[new Date().getMonth() + 1];
    }

    static numberToStringMonth(number: number): string {
        return MonthsOfYear[number];
    }

    static stringMonthToNumber(month: string): number {
        return MonthsOfYear[month];
    }

}
