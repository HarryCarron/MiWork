import { DaysOfTheWeek, MonthsOfYear } from './enums/calendarEnums';
export class Calendar2Config {
    private InitDate = new Date('01-01-2019');
    private makeCalendarConfig = (): Object => {
        return Array.from({length: 12}).map((month, monthIndex) => {
            const dynamicMonth = new Date(this.InitDate.getFullYear(), monthIndex, 1);
            return {
                stringMonth: MonthsOfYear[dynamicMonth.getMonth() + 1 ],
                stringInt: dynamicMonth.getDay(),
                days: Array
                .from({length: new Date(dynamicMonth.getFullYear(),
                    dynamicMonth.getMonth(),
                    0).getDate()})
                .map((day, dayIndex) => {
                    const date = new Date (
                        dynamicMonth.getFullYear(),
                        dynamicMonth.getMonth(),
                        (dayIndex + 1)
                    );
                    return {
                        string: {
                            day: DaysOfTheWeek[dayIndex + 1],
                            month: MonthsOfYear[date.getMonth() + 1],
                        }, int: {
                            day: date.getDay() - 1,
                            month: date.getMonth() + 1
                        },
                    };
                 })
            };
        });
    }
}
