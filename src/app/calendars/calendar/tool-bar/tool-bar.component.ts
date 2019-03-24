import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonthsOfYear } from '../../../enums/calendarEnums';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})


export class ToolBarComponent implements OnInit {

    constructor() { }

    @Output() monthSelected = new EventEmitter<number>();

    public daysOfWeek: Array<string> = Array.from({ length: 12 }).map((j, i) => MonthsOfYear[i + 1]);

    public selectMonth(month: string): void {
        this.monthSelected.emit(MonthsOfYear[month]);
    }
    ngOnInit() {
    }

}
