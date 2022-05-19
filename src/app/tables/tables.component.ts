import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import paymentsJson from '../payments_default.json';
import { PAYMENTS } from '../Models/payments';
import { FormControl } from '@angular/forms';
import moment from 'moment';

/**
 * @title Table with sorting
 */

export interface EmpFilter {
  name: string;
  options: string[];
  defaultValue: string;
}

export interface filterOption {
  name: string;
  value: string;
  isdefault: boolean;
}
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements AfterViewInit {
  toppings = new FormControl();
  selected = 'TODAY'
  period: string = '';
  startHour: any = ''
  endHour: any = ''
  startDay: any = moment().toDate()
  endDay: any = moment().toDate()

  toppingList: any = [{ text: 'Today', value: 'TODAY' },
  { text: 'Yesterday', value: 'YESTERDAY' },
  { text: 'This Week', value: 'THIS_WEEK' },
  { text: 'Last Week', value: 'LAST_WEEK' },
  { text: 'This Month', value: 'THIS_MONTH' },
  { text: 'Last 30 Days', value: 'LAST_30_DAYS' },
  { text: 'Last Month', value: 'LAST_MONTH' }];

  EmpData: PAYMENTS[] = [paymentsJson]
  payments: PAYMENTS = paymentsJson as any;
  displayedColumns: string[] = ['transaction_date', 'receipt_date', 'amount', 'charity_amount', 'total_amount', 'user_structure1', 'user_structure2', 'user_structure3', 'trx_types', 'trx_mode', 'card_schemes', 'payment_id', 'order_ref', 'authorization', 'trx_channel'];
  dataSource = new MatTableDataSource(this.payments.data);

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      const filtered = JSON.parse(filter)
      console.log(filtered)
      let startDate = moment(filtered.startDate)
      let endDate = moment(filtered.endDate)
      const transactionDate = moment(data.transaction_date)
      console.log({ startDate, endDate, transactionDate })
      console.log(data)
      if (filtered.startHour == '') {
        startDate = moment(filtered.startDate)
        //.set({hour:0,minute:0,second:0,millisecond:0})
      }
      else {
        //   const am_pm=filtered.startHour.substring(filtered.startHour.length-2)
        //   const hour=am_pm=='AM'?Number(filtered.startHour.substring(0,filtered.startHour.indexOf(":"))):Number(filtered.startHour.substring(0,filtered.indexOf(":")))+12
        //   const minute=Number(filtered.startHour.substring(filtered.startHour.indexOf(":")+1,filtered.startHour.indexOf(":")+3));
        //   console.log({am_pm,hour,minute})
        //   startDate=moment(filtered.startDate).set({hour:hour,minute:minute,second:0,millisecond:0})
      }
      if (filtered.endHour == '') {
        endDate = moment(filtered.endDate)
        //.set({hour:0,minute:0,second:0,millisecond:0})
      }
      else {

      }
      return (startDate.isSameOrBefore(transactionDate)) && (endDate.isSameOrAfter(transactionDate))
      //return data.transaction_date.toLowerCase().includes(filtered.startDate)
    };
  }
  changePeriod() {
    if (this.period == 'TODAY') {
      this.startDay = moment().toDate()
      this.endDay = moment().toDate()
    }
    else if (this.period == 'YESTERDAY') {
      this.startDay = moment().add(-1, 'days').toDate()
      this.endDay = moment().add(-1, 'days').toDate()
    }
    else if (this.period == 'THIS_WEEK') {
      this.startDay = moment().startOf('week').toDate()
      this.endDay = moment().endOf('week').toDate()
    }
    else if (this.period == 'LAST_WEEK') {
      this.startDay = moment().add(-1, 'weeks').startOf('week').toDate()
      this.endDay = moment().add(-1, 'weeks').endOf('week').toDate()
    }
    else if (this.period == 'THIS_MONTH') {
      this.startDay = moment().startOf('month').toDate()
      this.endDay = moment().endOf('month').toDate()
    }
    else if (this.period == 'LAST_30_DAYS') {
      this.startDay = moment().add(-30, 'days').toDate()
      this.endDay = moment().toDate()
    }
    else {
      this.startDay = moment().add(-1, 'months').startOf('month').toDate()
      this.endDay = moment().add(-1, 'months').endOf('month').toDate()
    }
  }
  apply() {
    const startHour = this.startHour
    const endHour = this.endHour
    const startDate = moment(this.startDay).format("YYYY-MM-DD")
    const endDate = moment(this.endDay).format("YYYY-MM-DD")
    const filtered = { startDate: startDate, endDate: endDate, startHour: startHour, endHour }
    this.dataSource.filter = JSON.stringify(filtered)
  }
  reset() {
    this.dataSource.data = this.payments.data
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }
    else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
