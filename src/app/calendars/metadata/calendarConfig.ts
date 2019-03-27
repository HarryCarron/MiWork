import { DaysOfTheWeek, MonthsOfYear } from './../../enums/calendarEnums';
export class CalendarConfig {

    constructor(initDate: Date, renderBleed: Boolean) {
        this.InitDate = initDate;
        this.renderBleed = renderBleed;
    }

    private InitDate: Date = null;
    private renderBleed: Boolean = null;

    private makeCalendarCellTestData(): Array<any> {
        const subjects = [
            {
                subject: 'science',
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
        return Array.from({length: (Math.floor(Math.random() * 3))}).map(function() {
            const randomIndex = Math.floor(Math.random() * Math.floor(subjects.length));
            return {
                subject: subjects[randomIndex].subject,
                color: subjects[randomIndex].color,
                data: 'test'
            };
        });

    }

    public makeCalendarConfig = (): object => {

        let initDate: Date = (new Date(this.InitDate.getFullYear(), 0, 1));
        const output = [];
        let week = [];

        let monthObj = null;

        function getWeekCount(date: Date): Number {
            return Math.ceil(
                Math.abs(1 - (date.getDay() === 0 ? 7 : date.getDay())) +
                new Date(date.getFullYear(), date.getMonth(), 0).getDate() / 7
            );
        }

        function pushDay(day: Object, override: boolean): void {
            week.push(day);
            if (week.length === 7 || override) {
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
                assignments: ([6, 7].indexOf(day) === -1 && Math.floor(Math.random() * 5) > 3) ? this.makeCalendarCellTestData() : [],
                isweekend: ([6, 7].indexOf(day) !== -1),
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
        };

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
                pushDay(makeDayObject(leadPaddingDate, true), false);
                leadPaddingDate.setDate(leadPaddingDate.getDate() + 1 );
            }
        }

        function makeTrailingPadding(date: Date): void {
            const colspanAmmount = Math.abs(week.length - 7);
            for (let i = 0; i < colspanAmmount; i++) {
                date.setDate(date.getDate() + 1);
                pushDay(makeDayObject(date, true), false);
            }
        }

        for (let monthI = 0; monthI < 12; monthI++) {
            initDate = new Date (this.InitDate.getFullYear(), monthI, 1);
            initMonthObj();
            const finalDay = new Date(initDate.getFullYear(), initDate.getMonth() + 1, 0).getDate() - 1;
            monthObj.month = MonthsOfYear[(monthI + 1)];
            monthObj.year = initDate.getFullYear();
            monthObj.weekCount = getWeekCount(initDate);
            let dayCount = 0;
            let stopMonthLoop = false;
            for (let weekI = 1; weekI <= monthObj.weekCount ; weekI++) {
                if (!stopMonthLoop) {
                    for (let dayI = 1; dayI <= 7; dayI++) {
                        dayCount++;
                        if (this.renderBleed && dayI === 1 && weekI === 1 && initDate.getDate() !== 0)  {
                            makeLeadingMonthPadding(initDate);
                        }
                        pushDay(makeDayObject(initDate, false), false);
                        initDate.setDate(initDate.getDate() + 1);
                        if (dayCount === finalDay) {
                            pushDay(makeDayObject(initDate, false), false);
                            if (this.renderBleed && week.length > 0) {
                                makeTrailingPadding(initDate);
                            }
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
