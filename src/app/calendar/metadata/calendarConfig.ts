import { DaysOfTheWeek, MonthsOfYear } from './enums/calendarEnums';
import * as moment from 'moment';
// import { NumberValueAccessor } from '@angular/forms/src/directives';
export class CalendarConfig {

    private givenYear = 2019;

    private makeYearObject(): Array<any> {
        const output = [];
        let week = [];
        let initDate: Date = (new Date(this.givenYear, 0, 1));
        let monthObj = null;

        initMonthObj();

        function getWeekCount(year, monthNumber) {

            // month_number is in the range 1..12
            const firstOfMonth = new Date(year, monthNumber, 1);
            const lastOfMonth = new Date(year, monthNumber + 1, 0);
            const used = firstOfMonth.getDay() + lastOfMonth.getDate();
            return Math.ceil( used / 7);
        }


        function pushDay(day: Object): void {

            week.push(day);
            if (week.length === 7) {
                monthObj.weeks.push(week);
                week = [];
            }
        }

        function makeDayObject(date: Date ): object {

            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();


            return {
                standardisedDate: padDate(day) + '-' + padDate(month) + '-' + year,
                // isColspan: isColspan,
                assignments: [],
                string: {
                    days: DaysOfTheWeek[day],
                    month: MonthsOfYear[month],
                    year: year.toString()
                },
                int: {
                    day: day,
                    month: month,
                    year: year
                }
            };
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
            const leadPaddingDate = new Date(date);
            leadPaddingDate.setDate(leadPaddingDate.getDate() - (date.getDay() - 1));
            for (let i = 0; i < date.getDay() - 1; i++) {
                pushDay(makeDayObject(leadPaddingDate));
                leadPaddingDate.setDate(leadPaddingDate.getDate() + 1 );
            }
        }

        for (let monthI = 0; monthI < 12; monthI++) {
            initMonthObj();
            monthObj.month = MonthsOfYear[monthI];
            monthObj.weekCount = getWeekCount(this.givenYear, monthI);
            const dayCount = 0;
            let masterDayCount = 0;
            initDate = new Date (this.givenYear, monthI, 1);

            for (let weekI = 0; weekI <= monthObj.weekCount - 1 ; weekI++) {
                for (let dayI = 1; dayI <= 7; dayI++) {
                masterDayCount++;
                if (dayI === 1 && weekI === 0 && initDate.getDate() !== 0)  {
                    makeLeadingMonthPadding(initDate);
                }
                pushDay(makeDayObject(initDate));
                initDate.setDate(initDate.getDate() + 1);

                }
            }
            output.push(monthObj);
        }
        console.log(output);
        return output;
    }
}
