import React from 'react';
import './App.css';
import CalendarView from './calendar/calendarView';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';
import retrieveAllClasses from '../services/airtable';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      classes: {}
    }
  }

  componentDidMount(){
    retrieveAllClasses().then((data) => {
      this.setState({
          classes: data,
          isLoading: false
        });
    });
  }

  renderCalender(){
    return(
      <div>
        {this.state.classes !== {} && <CalendarView classes = {this.state.classes}/>}
      </div>
    );
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className='titleHeader'>
            <h2 className='title'>
              TKC Class Sign-Up
            </h2>
            <div className='icon'>
              <IconButton>
                <Badge badgeContent={4} color="secondary">
                  <AssignmentIcon/>
                </Badge>
              </IconButton>
            </div>
           
          </div>
  
          <div className = "textGen">
            <p className="textBlurb">
              We always work around our families’ schedules. If any of these recommended times don’t work for you OR for holiday hours, please call (630) 708-3132.
            </p>
          </div>
        </header>
        <div>
          {this.state.isLoading ? <CircularProgress /> : this.renderCalender()}
        </div>
      </div>
    );
  }
}

