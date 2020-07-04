import React from 'react';
import moment from 'moment';
import './calendarView.css';

let weekdayshortname = moment.weekdaysShort().map(day => {
  return(
    <th key={day} className='week-day'>
      {day}
    </th>
  );
});

let dateObject1 = moment();

let firstDayOfMonth = () => {
  let dateObject = dateObject1.dateObject;
  let firstDay = moment(dateObject).startOf('month').format('d');
  return firstDay;
}

let blanks = [];
for (let i = 0; i < firstDayOfMonth(); i++) {
  blanks.push(
    <td className="empty">{""}</td>
  );
}

let daysInMonth = [];
for (let d = 1; d <= 31; d++) {
  daysInMonth.push(
    <td key={d} className="calendar-day">
      {d}
    </td>
  );
}

let trailingBlanks = [];
for (let i=0; i< (35-(blanks.length + daysInMonth.length)); i++){
  trailingBlanks.push(
    <td className="empty">{""}</td>
  )
}

var totalSlots = [...blanks, ...daysInMonth, ...trailingBlanks];
let rows = [];
let cells = [];

totalSlots.forEach((row, i) => {
  if (i % 7 !== 0) {
    cells.push(row); // if index not equal 7 that means not go to next week
  } else {
    rows.push(cells); // when reach next week we contain all td in last week to rows 
    cells = []; // empty container 
    cells.push(row); // in current loop we still push current row to new container
  }
  if (i === totalSlots.length - 1) { // when end loop we add remain date
    rows.push(cells);
  }
});

let daysinmonth = rows.map((d, i) => {
  return <tr>{d}</tr>;
});

function CalendarView() {

  return (
    <div>
      <h3 className = 'month'>
        {dateObject1.format("MMMM")}
      </h3>
      <table>
        <thead className = 'week'>
          <tr>{weekdayshortname}</tr>
        </thead>
        <tbody>{daysinmonth}</tbody>
      </table>    
    </div>
  );
}

export default CalendarView;