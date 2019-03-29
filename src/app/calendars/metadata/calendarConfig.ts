import { DaysOfTheWeek, MonthsOfYear } from './../../enums/calendarEnums';
import { async } from 'q';
declare var $: any;
export class CalendarConfig {

    constructor(initDate: Date, renderBleed: Boolean) {
        this.InitDate = initDate;
        this.renderBleed = renderBleed;
    }

    private InitDate: Date = null;
    private renderBleed: Boolean = null;
    private holidays: Array<any> = [];

    private week: Array<any> = [];

    private monthObj: any = {};

    public getHolidays(): Promise<any> {
        // to do; make dynamic to user location
        return $.get( 'https://www.gov.uk/bank-holidays.json');
    }

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

    public addHolidaysToMetadataAndOutput(holidays: Array<any>) {
        this.holidays = this.sortHolidays(holidays['england-and-wales'].events);
        return this.makeCalendarConfig();
    }

    private sortHolidays = (holidays: Array<any>): Array<any> => {
        // todo: return hoidays based on users location
        return holidays.filter(
            (event: Array<any>) => event['date'].split('-')[0] === this.InitDate.getFullYear().toString()
            );
    }

    private getWeekCount(date: Date): Number {
        return Math.ceil(
            Math.abs(1 - (date.getDay() === 0 ? 7 : date.getDay())) +
            new Date(date.getFullYear(), date.getMonth(), 0).getDate() / 7
        );
    }

    private pushDay(day: Object, override: boolean): void {
        this.week.push(day);
        if (this.week.length === 7 || override) {
            this.monthObj.weeks.push(this.week);
            this.clearWeek();
        }
    }

    private checkForHoliday = (dateString: string): any => {
        const holidayFound = this.holidays.find(function(holiday) { return holiday.date === dateString; });
        if (holidayFound) {
            return holidayFound;
        } else {
            return {title: ''};
        }
    }

    private makeDayObject = (inputDate: Date, isColspan: boolean ): object => {

        const date = inputDate.getDate();
        const day = inputDate.getDay();
        const month = inputDate.getMonth() + 1;
        const year = inputDate.getFullYear();

        return {
            standardisedDate: this.padDate(date) + '-' + this.padDate(month) + '-' + year,
            assignments: ([6, 0].indexOf(day) === -1 && Math.floor(Math.random() * 5) > 3) ? this.makeCalendarCellTestData() : [],
            isweekend: ([6, 0].indexOf(day) !== -1),
            isColspan : isColspan,
            holidayInfo : this.checkForHoliday(year + '-' + this.padDate(month) + '-' + this.padDate(date) || null),
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

    private clearWeek(): void {
        this.week = [];
    }

    private initMonthObj(): void {
        this.monthObj = {
            month: null,
            weekCount: null,
            weeks: [],
        };
    }

    private padDate(num: number): string {
        let s = num + '';
        while (s.length <= 1) {
            s = '0' + s;
        }
        return s;
    }

    private makeLeadingMonthPadding(date: Date): void {
        const dayOverwrite = date.getDay() === 0 ? 7 : date.getDay();
        const colspanAmmount = Math.abs(1 - dayOverwrite);
        const leadPaddingDate = new Date(date);
        leadPaddingDate.setDate(leadPaddingDate.getDate() - colspanAmmount);
        for (let i = 0; i < colspanAmmount; i++) {
            this.pushDay(this.makeDayObject(leadPaddingDate, true), false);
            leadPaddingDate.setDate(leadPaddingDate.getDate() + 1 );
        }
    }

    private makeTrailingPadding(date: Date): void {
        const colspanAmmount = Math.abs(this.week.length - 7);
        for (let i = 0; i < colspanAmmount; i++) {
            date.setDate(date.getDate() + 1);
            this.pushDay(this.makeDayObject(date, true), false);
        }
    }

    private makeCalendarConfig = () => {

        let initDate: Date = (new Date(this.InitDate.getFullYear(), 0, 1));
        const output = [];

        for (let monthI = 0; monthI < 12; monthI++) {
            initDate = new Date (this.InitDate.getFullYear(), monthI, 1);
            this.initMonthObj();
            const finalDay = new Date(initDate.getFullYear(), initDate.getMonth() + 1, 0).getDate() - 1;
            this.monthObj.month = MonthsOfYear[(monthI + 1)];
            this.monthObj.year = initDate.getFullYear();
            this.monthObj.weekCount = this.getWeekCount(initDate);
            let dayCount = 0;
            let stopMonthLoop = false;
            for (let weekI = 1; weekI <= this.monthObj.weekCount ; weekI++) {
                if (!stopMonthLoop) {
                    for (let dayI = 1; dayI <= 7; dayI++) {
                        dayCount++;
                        if (this.renderBleed && dayI === 1 && weekI === 1 && initDate.getDate() !== 0)  {
                            this.makeLeadingMonthPadding(initDate);
                        }
                        this.pushDay(this.makeDayObject(initDate, false), false);
                        initDate.setDate(initDate.getDate() + 1);
                        if (dayCount === finalDay) {
                            this.pushDay(this.makeDayObject(initDate, false), false);
                            if (this.renderBleed && this.week.length > 0) {
                                this.makeTrailingPadding(initDate);
                            }
                            stopMonthLoop = true;
                            break;
                        }
                    }
                }
            }
            output.push(this.monthObj);
            this.clearWeek();
        }
        return output;
    }
}
