import { DaysOfTheWeek, MonthsOfYear } from './enums/calendarEnums';
import * as moment from 'moment';
// import { NumberValueAccessor } from '@angular/forms/src/directives';
export class CalendarConfig {

    private givenYear = 2019; // temp

    private makeYearObject(): Array<any> {
        const output = [];
        let week = [];
        let initDate: Date = (new Date(this.givenYear, 0, 1));
        let monthObj = null;

        initMonthObj();

        // function getWeekCount(year, monthNumber) {

        //     const firstOfMonth = new Date(year, monthNumber, 1);
        //     const lastOfMonth = new Date(year, monthNumber + 1, 0);
        //     const used = firstOfMonth.getDay() + lastOfMonth.getDate();
        //     return Math.ceil( used / 7);
        // }

        function getWeekCount(year: number, month: number): number {
            const date = new Date(year, month - 1, 1);
            const day = date.getDay();
            const numDaysInMonth = new Date(year, month, 0).getDate();
            return Math.ceil((numDaysInMonth + day) / 7);
        }



        function pushDay(day: Object): void {

            week.push(day);
            if (week.length === 7) {
                monthObj.weeks.push(week);
                week = [];
            }
        }

        function makeDayObject(inputDate: Date, isColspan: boolean ): object {

            const date = inputDate.getDate();
            const day = inputDate.getDay();
            const month = inputDate.getMonth() + 1;
            const year = inputDate.getFullYear();

            return {
                standardisedDate: padDate(date) + '-' + padDate(month) + '-' + year,
                assignments: [],
                isColspan : isColspan,
                string: {
                    days: DaysOfTheWeek[day],
                    month: MonthsOfYear[month],
                    year: year.toString()
                },
                int: {
                    day: date,
                    month: month,
                    year: year
                }
            };
        }

        function clearWeek(): void {
            week = [];
        }

        function initMonthObj(): void {
            monthObj = {
                month: null,
                weekCount: null,
                weeks: [],
            };
        }


        function padDate(num: number): string {
            let s = num + '';
            while (s.length <= 1) {
                s = '0' + s;
            }
            return s;
        }

        function makeLeadingMonthPadding(date: Date): void {
            const dayOverwrite = date.getDay() === 0 ? 7 : date.getDay();
            const colspanAmmount = Math.abs(1 - dayOverwrite);
            const leadPaddingDate = new Date(date);
            leadPaddingDate.setDate(leadPaddingDate.getDate() - colspanAmmount);
            for (let i = 0; i < colspanAmmount; i++) {
                pushDay(makeDayObject(leadPaddingDate, true));
                leadPaddingDate.setDate(leadPaddingDate.getDate() + 1 );
            }
        }

        function makeTrailingPadding(date: Date): void {

            const colspanAmmount = Math.abs(date.getDay() - 7);
            for (let i = 0; i < colspanAmmount; i++) {
                date.setDate(date.getDate() + 1);
                pushDay(makeDayObject(date, true));
            }
        }

        for (let monthI = 0; monthI < 12; monthI++) {
            initDate = new Date (this.givenYear, monthI, 1);
            initMonthObj();
            monthObj.month = MonthsOfYear[(monthI + 1)];
            monthObj.year = initDate.getFullYear();
            monthObj.weekCount = getWeekCount(this.givenYear, monthI);
            const dayCount = 0;
            let masterDayCount = 0;
            for (let weekI = 0; weekI <= monthObj.weekCount - 1 ; weekI++) {
                for (let dayI = 1; dayI <= 7; dayI++) {
                masterDayCount++;
                if (dayI === 1 && weekI === 0 && initDate.getDate() !== 0)  {
                    makeLeadingMonthPadding(initDate);
                }
                pushDay(makeDayObject(initDate, false));
                initDate.setDate(initDate.getDate() + 1);

                if (masterDayCount ===  new Date(initDate.getFullYear(), initDate.getMonth(), 0).getDate()) {

                    makeTrailingPadding(new Date(initDate.setDate(initDate.getDate() - 1)));
                }

                }
            }
            output.push(monthObj);
            clearWeek();
        }
        console.log(output);
        return output;
    }
}
