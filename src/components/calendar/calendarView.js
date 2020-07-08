import React from 'react';
import moment from 'moment';
import './calendarView.css';
import DaysInMonth from './weekView';

let weekdayshortname = moment.weekdaysShort().map(day => {
  return(
    <th key={day} className='week-day'>
      {day}
    </th>
  );
});

let dateObject1 = moment();

export default class CalendarView extends React.Component {
  state = {
    classes : this.props.classes
  }

  componentDidUpdate(prevProps){
    if (this.props.classes !== prevProps){
      // this.setState({classes : this.props.classes});
    }
  }

  render(){
    return (
      <div>
        <h3 className = 'month'>
          {dateObject1.format("MMMM")}
        </h3>
        <table>
          <thead className = 'week'>
            <tr>{weekdayshortname}</tr>
          </thead>
          {this.state.classes !== {} && <DaysInMonth classes = {this.props.classes}/>}
        </table>    
      </div>
    );
  }
}