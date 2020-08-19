import React from 'react';
import './App.css';
import CalendarView from './calendar/calendarView';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import retrieveAllClasses from '../services/airtable';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';
import OpeningDialog from './openingDialog';
// import { makeStyles } from '@material-ui/core/styles';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      classes: {},
      finishedSignin: false,
      studentInfo: {}
    }
  }

  componentDidMount(){
    // this.retrieveClassData();
  }

  retrieveClassData(){
    retrieveAllClasses().then((data) => {
      this.setState({
          ...this.state,
          classes: data,
          isLoading: false
        });
    });
  }

  handleChosenClasses(classes) {
    console.log(classes);
  }

  handleStudentData(data){
    this.setState({
      ...this.state,
      finishedSignin: true,
      studentInfo: data
    });
    console.log(data);
    this.retrieveClassData();
  }

  renderCalendar(){
    console.log("in rennder calendar");
    return(
      <div>
        {this.state.classes !== {} && <CalendarView classes = {this.state.classes} chosenClasses={(classes) => this.handleChosenClasses(classes)}/>}
      </div>
    );
  }

  renderDialog(){
    console.log('in render');
    return(
      <div>
        <OpeningDialog studentData = {(data) => this.handleStudentData(data)}/>
      </div>
    );
  }

  render(){
    return (
      <div className="App">
        {/* <CssBaseline/> */}
        <AppBar position = 'sticky'> 
          <ToolBar>
            <Typography align = 'center' variant = 'h2'>
              TKC Class Sign-Up
            </Typography>
            <Button variant = 'outlined' className = 'reviewButton'>
              {/* <Badge badgeContent={4} color="secondary"> */}
                Review and Register
              {/* </Badge> */}
            </Button>
          </ToolBar>
        </AppBar>
        
        <div className = "textGen">
          <p className="textBlurb">
            We always work around our families’ schedules. If any of these recommended times don’t work for you OR for holiday hours, please call (630) 708-3132.
          </p>
        </div>

        {(this.state.finishedSignin === false) ? this.renderDialog() : null}

        <div>
          {!this.state.finishedSignin ? null :
            this.state.isLoading? <CircularProgress /> : this.renderCalendar()
          }
        </div>
      </div>
    );
  }
}

