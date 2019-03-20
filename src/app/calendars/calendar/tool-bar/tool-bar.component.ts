import { Component, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonthsOfYear } from '../../../enums/calendarEnums';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})


export class ToolBarComponent implements OnInit {

    constructor() { }

    @Output()

    public daysOfWeek: Array<string> = Array.from({ length: 12 }).map((j, i) => MonthsOfYear[i + 1]);

    public selectMonth(month: number): void {
        const hello = 'world';
    }
    ngOnInit() {
    }

}
