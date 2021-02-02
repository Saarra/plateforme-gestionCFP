import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbDatepicker, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .custom-datepicker .ngb-dp-header {
      padding: 0;
    }
    .custom-datepicker .ngb-dp-content {
      display: grid;
      grid-template-columns: auto auto;
      grid-column-gap: 1rem;
      grid-row-gap: 0.5rem;
    }
  `]
})
export class DashboardComponent implements OnInit {


  @ViewChild(NgbDatepicker, {static: true}) datepicker: NgbDatepicker;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;

  constructor(calendar: NgbCalendar, public i18n: NgbDatepickerI18n) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
  }
  navigate(number: number) {
    const {state, calendar} = this.datepicker;
    this.datepicker.navigateTo(calendar.getNext(state.firstDate, 'm', number));
  }

  today() {
    const {calendar} = this.datepicker;
    this.datepicker.navigateTo(calendar.getToday());
  }
  onDateSelection(date: NgbDate) {
    console.log(this.fromDate);

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    console.log(this.toDate)

  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}
