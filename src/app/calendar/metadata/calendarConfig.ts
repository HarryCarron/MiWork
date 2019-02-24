import { DaysOfTheWeek, MonthsOfYear } from './enums/calendarEnums';
import * as moment from 'moment';
export class CalendarConfig {

    private givenYear = 2019; // temp

    private makeCalendarCellTestData(): Array<any> {
        const subjects = [
            {subject: 'science',
            color: '#EF9A9A'
            },
            {
                subject: 'maths',
                color: '#F48FB1'
            },
            {
                subject: 'english',
                color: '#CE93D8'
            },
            {
                subject: 'french',
                color: '#B39DDB',

            },
            {
                subject: 'geography',
                color: '#9FA8DA'
            },
            {
                subject: 'russian',
                color: '#90CAF9'
            }
        ];
        return Array.from({length: (Math.floor(Math.random() * Math.floor(3)))}).map(function() {
            const randomIndex = Math.floor(Math.random() * Math.floor(subjects.length));
            return {
                subject: subjects[randomIndex].subject,
                color: subjects[randomIndex].color,
                data: 'test'
            };
        });

    }

    private makeYearObject(): Array<any> {
        const output = [];
        let week = [];
        let initDate: Date = (new Date(this.givenYear, 0, 1));
        let monthObj = null;

        function getWeekCount(date: Date): Number {
            return Math.ceil(
                Math.abs(1 - date.getDay() === 0 ? 7 : date.getDay()) +
                new Date(date.getFullYear(), date.getMonth(), 0).getDate() / 7
            );
        }




        function pushDay(day: Object): void {

            week.push(day);
            if (week.length === 7) {
                monthObj.weeks.push(week);
                clearWeek();
            }
        }

        const makeDayObject = (inputDate: Date, isColspan: boolean ): object => {

            const date = inputDate.getDate();
            const day = inputDate.getDay();
            const month = inputDate.getMonth() + 1;
            const year = inputDate.getFullYear();
            return {
                standardisedDate: padDate(date) + '-' + padDate(month) + '-' + year,
                assignments: (month === 2) ? this.makeCalendarCellTestData() : [],
                isweekend: ([6, 0].indexOf(day) !== -1),
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
            const colspanAmmount = Math.abs(week.length - 7);
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
            monthObj.weekCount = getWeekCount(initDate);
            let dayCount = 0;
            let stopMonthLoop = false;
            console.log(MonthsOfYear[monthI + 1] + ': ' + new Date(initDate.getFullYear(), initDate.getMonth() + 1, 0).getDate());
            for (let weekI = 1; weekI <= monthObj.weekCount ; weekI++) {
                if (!stopMonthLoop) {
                    for (let dayI = 1; dayI <= 7; dayI++) {
                        dayCount++;
                        if (dayI === 1 && weekI === 1 && initDate.getDate() !== 0)  {
                            makeLeadingMonthPadding(initDate);
                        }
                        pushDay(makeDayObject(initDate, false));
                        initDate.setDate(initDate.getDate() + 1);
                        const test = new Date(initDate.getFullYear(), initDate.getMonth() + 1, 0).getDate() - 1;
                        if (dayCount === test) {
                            pushDay(makeDayObject(initDate, false));
                            makeTrailingPadding(initDate);
                            stopMonthLoop = true;
                            break;
                        }
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
