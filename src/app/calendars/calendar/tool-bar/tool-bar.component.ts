import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarTools } from '../../../masterServices/master.service';
declare var $: any;

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})


export class ToolBarComponent implements OnInit {

    constructor() { }

    @Output() monthSelected = new EventEmitter<number>();
    public selectedMonth: number = null;
    public selectedMonthString: string = null;

    public monthsOfYear: Array<string> = Array.from({ length: 12 }).map((j, i) => CalendarTools.numberToStringMonth(i + 1));

    public selectMonth(month: string | number): void {
        if (typeof month  === 'string') {
            this.selectedMonth = CalendarTools.stringMonthToNumber(month);
        } else {
            this.selectedMonth = month;
        }
        this.monthSelected.emit(this.selectedMonth);
        this.selectedMonthString = CalendarTools.numberToStringMonth(this.selectedMonth);
    }

    private isValidCalIncrement (mode: boolean): boolean {
        if (mode && this.selectedMonth === 1
            || !mode && this.selectedMonth === 12) {
            return false;
        } else {
            return true;
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.selectMonth(CalendarTools.todaysStringMonth());
        }, 400);

        $(document).keypress(($event: any) => {
            if ($event.which && [122, 120].indexOf($event.which) !== -1
            && this.isValidCalIncrement($event.which === 122)) {
                const incNumber: number = $event.which === 120

                ? this.selectedMonth + 1
                : this.selectedMonth - 1;

                this.selectMonth(incNumber);
            }
        });

        $('.innerCalendarContainer').scroll(() => {
            this.selectedMonthString = null;
        });
    }
}
