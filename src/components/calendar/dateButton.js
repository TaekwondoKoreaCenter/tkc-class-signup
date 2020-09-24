import React from 'react';
import {
  Drawer,
  Button,
  Toolbar,
  CssBaseline
} from '@material-ui/core';
import './dateButton.css';
import ClassCard from './classCard';

export default class DateButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      drawerOpen: false,
      date: props.date,
      addedClasses: [],
      updated: false
    };
    this.handleAddClass = this.handleAddClass.bind(this);
    this.handleChosenClasses = this.handleChosenClasses.bind(this);
  }

  componentWillMount(){
  }
  
  handleOpen(){
    if (this.props.currentChosenClasses !== undefined){
      console.log("HEELOOO: " + JSON.stringify(this.props.currentChosenClasses));
      console.log("hello: " + this.props.currentChosenClasses[this.props.date]);
      console.log('date: ' + this.props.date);

    } else {
      console.log("not reaching");
    }
    this.setState({
      drawerOpen: true,
      addedClasses: (this.props.currentChosenClasses !== {} && Object.keys(this.props.currentChosenClasses).includes(this.props.date))? this.props.currentChosenClasses[this.props.date] : []
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
    let result = {};

    console.log('ADDED CLASSES: ' + this.state.addedClasses);

    result[this.props.date] = this.state.addedClasses;

    console.log("RETURNING: " + JSON.stringify(result));

    this.props.chosenClasses(result);
    this.setState({
      drawerOpen: false
    });
  }

  // handleAddClass(classToggle){
  //   let updatedClasses = [];
  //   if (classToggle['clicked']){
  //     if (this.state.addedClasses.includes(classToggle['classId'])) {
  //       updatedClasses.push(classToggle['classId']);
  //     } 
  //   }
  // }

  handleAddClass(classToggle){
    if (!classToggle['clicked']){
      let newlyRemoved = [];
      this.state.addedClasses.forEach((item) => {
        if (item !== classToggle['classId']){
          console.log("item: " + item);
          console.log(classToggle['classId']);
          newlyRemoved.push(item);
        }
      });
      console.log("newly removed: " + newlyRemoved);
      let flag = newlyRemoved.length < this.state.addedClasses.length;
      this.setState(
        {
          ...this.state,
          addedClasses: newlyRemoved,
          updated: flag
        }
      )
    } else {
      if (!this.state.addedClasses.includes(classToggle['classId'])){
        let newlyAdded = this.state.addedClasses.concat(classToggle['classId']);
        this.setState(
          {
            ...this.state,
            addedClasses: newlyAdded
          }
        )
      }
    }
  }

  render() {
    const classes = this.props.classesThisDay;
    const dayOfWeek = this.props.dayOfWeek;
    const date = this.formatDate();
    const updated = this.state.updated;

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
                <ClassCard session = {session} chosenClass = {(item) =>this.handleAddClass(item)} dayOfWeek = {dayOfWeek} isChosen = {this.state.addedClasses.includes(session['classId'])}/>
              </div>)
            })
            }
            </div>
          </div>
          <div>
            {updated?
              <Button variant='contained' color='primary' onClick= {this.handleChosenClasses}>
                Update
              </Button> :
              this.state.addedClasses.length === 0?  
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
