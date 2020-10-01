import React from 'react';
import './App.css';
import CalendarView from './calendar/calendarView';
import {retrieveAllClasses} from '../services/airtable';
import {
  Button,
  CircularProgress,
  AppBar,
  Typography,
  Snackbar,
  Badge,
  Toolbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import OpeningDialog from './openingDialog';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import ClassTracker from '../services/classAddTracker';
import ClosingDialog from './closingDialog';
import { withStyles} from '@material-ui/core/styles';
import { white } from 'material-ui/styles/colors';

const WhiteButton = withStyles((theme) => ({
  root: {
    color: white,
    backgroundColor: white[700],
    '&:hover': {
      backgroundColor: white[600],
    },
    borderColor: white
  },
}))(Button);

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      classes: {},
      finishedSignin: false,
      studentInfo: {},
      currentChosenClasses: {},
      closingDialogOpen: false,
      classMappings: {},
      errorCaught: false,
      totalClassCount: [],
      addSuccess: false
    }
    this.classTracker = new ClassTracker();
    this.renderClosingDialog = this.renderClosingDialog.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);
    this.handleSuccessClose = this.handleSuccessClose.bind(this);
  }

  retrieveClassData(studentData){
    retrieveAllClasses(studentData['student_type']).then((data) => {
      this.setState({
          ...this.state,
          classes: data['allClasses'],
          isLoading: false,
          classMappings: data['classMappings']
      });
    });
  }

  handleChosenClasses(classes) {    
    try {
      let result = this.classTracker.updateClasses(classes);
      let total = this.classTracker.getTotalClasses();
      this.setState({
        ...this.state,
        currentChosenClasses: result,
        totalClassCount: total,
        addSuccess: true
      });
    } catch (e) {
      console.log('error caught');
      this.handleError();
    }
  }

  handleError(){
    this.setState({
      ...this.state,
      errorCaught: true
    });
  }

  handleErrorClose(){
    this.setState({
      ...this.state,
      errorCaught: false
    });
  }

  handleSuccessClose(){
    this.setState({
      ...this.state,
      addSuccess: false
    });
  }

  handleStudentData(data){
    this.setState({
      ...this.state,
      finishedSignin: true,
      studentInfo: data
    });
    console.log(data);
    this.retrieveClassData(data);
    this.classTracker.setClassLimit(data['student_type']);
  }

  handleClosingDialog(){
    this.setState({
      ...this.state,
      closingDialogOpen: false
    });
  }

  renderCalendar(){
    return(
      <div>
        {this.state.classes !== {} && <CalendarView classes = {this.state.classes} chosenClasses={(classes) => this.handleChosenClasses(classes)} currentChosenClasses = {this.state.currentChosenClasses}/>}
      </div>
    );
  }

  renderDialog(){
    return(
      <div>
        <OpeningDialog studentData = {(data) => this.handleStudentData(data)}/>
      </div>
    );
  }

  renderClosingDialog() {
    this.setState({
      ...this.state,
      closingDialogOpen: true
    });
  }

  render(){
    return (
      <div className="App">
        <AppBar position = 'sticky'> 
          <Toolbar>
            {/* <Typography align = 'left' variant = 'h6'>
              {this.state.studentInfo['name']}
            </Typography> */}
            <Typography align = 'center' variant = 'h2'>
              TKC Class Sign-Up
            </Typography>
            <IconButton>
              <HelpIcon className = 'helpIcon'/>
            </IconButton>
            {/* { !this.state.closingDialogOpen && */}
              <Badge badgeContent={this.state.totalClassCount.length} color="secondary" invisible ={this.state.totalClassCount.length === 0 || this.state.closingDialogOpen}>
                <WhiteButton variant = 'outlined' className = 'reviewButton' onClick = {this.renderClosingDialog}  disabled={this.state.totalClassCount.length === 0 || this.state.closingDialogOpen}>
                    Review and Register
                </WhiteButton>
              </Badge>
            {/* }  */}
          </Toolbar>
        </AppBar>  

        {this.state.finishedSignin  &&
        <div className = "textGen">
          <p className="textBlurb">
          Please choose desired dates, classes, and click Review and Register at the right top to complete registration. If you have a question or concern, please submit without conflicting classes and contact us at (630) 708-3132 or info@TKCUSA.com.
          </p>
        </div>}

        <Snackbar open={this.state.errorCaught} autoHideDuration={6000} onClose={this.handleErrorClose} >
          <MuiAlert variant='filled' onClose={this.handleErrorClose} severity="error">
            Too many classes added! You can add up to {this.state.studentInfo['student_type'] === 'bbc'? 3 : 2} classes for each week.
          </MuiAlert>
        </Snackbar>

        <Snackbar open={this.state.addSuccess} autoHideDuration={1000} onClose={this.handleSuccessClose} >
          <MuiAlert variant='filled' onClose={this.handleSuccessClose} severity="success">
            Successfully updated!
          </MuiAlert>
        </Snackbar>

        {(this.state.finishedSignin === false) ? this.renderDialog() : null}
        {(this.state.closingDialogOpen) ? <ClosingDialog open = {this.state.closingDialogOpen} handleClose = {() => {this.handleClosingDialog()}}studentData = {this.state.studentInfo} currentChosenClasses = {this.state.currentChosenClasses} totalClasses = {this.state.totalClassCount} classMappings = {this.state.classMappings}/>: null}

        <div>
          {!this.state.finishedSignin ? null :
            this.state.isLoading? <CircularProgress /> : this.renderCalendar()
          }
        </div>
      </div>
    );
  }
}

