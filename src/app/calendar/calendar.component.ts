import { Component, Input } from '@angular/core';
import { CalendarConfig } from './metadata/calendarConfig';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { DaysOfTheWeek } from './metadata/enums/calendarEnums';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
    @Input() metadata: Array<any>;
    daysOfWeek: Array<any> = Array.from({length: 7}).map(function(j, i) { return DaysOfTheWeek[(i + 1)]; });
    calendarMetadata: any = new CalendarConfig();
    calendarConfig: any = this.calendarMetadata.makeYearObject();

}
