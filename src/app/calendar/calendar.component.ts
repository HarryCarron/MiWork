import { Component, Input } from '@angular/core';
import { CalendarConfig } from './metadata/calendarConfig';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  @Input() metadata: Array<any>;
  debugger;
  calendarMetadata: any = new CalendarConfig();
  x: Array<any> = this.calendarMetadata.makeYearObject();
//   daysOfWeek = this.structureConfig.stringValues.daysOfWeek;
}
