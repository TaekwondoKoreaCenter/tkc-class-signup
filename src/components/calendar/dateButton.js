import React from 'react';
import {
  Drawer,
  Button,
  Card,
  Paper,
  Grid,
  CardContent,
  IconButton,
  Toolbar,
  CssBaseline
} from '@material-ui/core';
import './dateButton.css';
import ClassCard from './classCard';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Typography from 'material-ui/styles/typography';

export default class DateButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      drawerOpen: false,
      date: props.date,
      addedClasses: []
    };
    this.handleAddClass = this.handleAddClass.bind(this);
    this.handleChosenClasses = this.handleChosenClasses.bind(this);
  }
  
  handleOpen(){
    this.setState({
      drawerOpen: true
    });
  }

  handleClose(){
    this.setState({
      drawerOpen: false
    });
  }

  formatDate(){
    let str = this.state.date.replace('-','/');
    while(str.charAt(0) === '0'){
      str = str.substring(1);
    }
    return str;
  }

  handleChosenClasses(){
    console.log("DATEBUTTON");
    this.props.chosenClasses(this.state.addedClasses);
  }

  handleAddClass(classToggle){
    if (!classToggle['clicked']){
      let newlyRemoved = [];
      this.state.addedClasses.forEach((item) => {
        if (item !== classToggle['classId'][0]){
          newlyRemoved.push(item);
        }
      });
      this.setState(
        {
          addedClasses: newlyRemoved
        }
      )
    } else {
      let newlyAdded = this.state.addedClasses.concat(classToggle['classId']);
      this.setState(
        {
          addedClasses: newlyAdded
        }
      )
    }
  }

  render() {
    const classes = this.props.classesThisDay;
    const dayOfWeek = this.props.dayOfWeek;
    const date = this.formatDate();

    return(
      <div className = 'button'>
        <CssBaseline/>
        <Button onClick={() => this.handleOpen()} className='calendar-day'>
            {this.props.onlyDate}
        </Button>
        <Drawer position= 'fixed' variant = 'temporary' anchor='right' elevation = {0} open={this.state.drawerOpen} onClose={() => this.handleClose()} className = 'drawer' BackdropProps = {{invisible: true}}>
          <Toolbar className='drawerTop'/>
          <div>
            <div className = 'dateHeader'>
                {dayOfWeek + ' ' + date} 
            </div>
            <div className = 'scrollCards'> 
            { classes.map((session) => {
              // eslint-disable-next-line no-unused-expressions
              return(
              <div className= 'classCardContainer'>
                <ClassCard session = {session} chosenClass = {(item) =>this.handleAddClass(item)}/>
              </div>)
            })
            }
            </div>
          </div>
          <div>
            {this.state.addedClasses.length === 0?  
              <Button variant='contained' disabled>
                Add Class
              </Button> :
              (this.state.addedClasses.length === 1?
                <Button variant='contained' color='primary' onClick = {this.handleChosenClasses}>
                  Add Class
                </Button> :
                <Button variant='contained' color='primary' onClick = {this.handleChosenClasses}>
                    Add {this.state.addedClasses.length} Classes
                </Button>)
            }
          </div>
        </Drawer>
      </div>
    );
  }
}
