import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Button,
  List,
  ListItem,
  Toolbar,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox
} from '@material-ui/core';
import './closingDialog.css';
import {registerStudent} from '../services/airtable';


export default class ClosingDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      finished: false,
      open: this.props.open,
      information: this.props.studentData,
      chosenClasses: this.props.currentChosenClasses,
      finalClasses: this.props.totalClasses
    });
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleClose(){
    this.props.handleClose();
  }

  handleRegister(){
    registerStudent({'studentData': this.state.information, 'chosenClasses': this.state.finalClasses});
  }

  handleToggle(recordId){
    let newFinal = [];
    if (this.state.finalClasses.includes(recordId)){
      this.state.finalClasses.forEach((record) => {
        if (record !== recordId) {
          newFinal.push(record);
        }
      })
      this.setState({
        ...this.state,
        finalClasses: newFinal
      });
    } else {
      newFinal = this.state.finalClasses;
      newFinal.push(recordId);
      this.setState({
        ...this.state,
        finalClasses: newFinal
      });
    }
  }

  render(){
    let dates = Object.keys(this.props.currentChosenClasses);
    dates.sort();

    return(
      <div>
        <Toolbar className='drawerTop'/>
        <Dialog fullScreen = {true} open={this.state.open} aria-labelledby="form-dialog-title">
          {console.log(JSON.stringify(this.props.classMappings))}
          <div className = 'dialogContentWrapper'>
          <DialogTitle id="form-dialog-closing">Review and Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Verify the classes you would like to add, and uncheck the classes you want to remove. 
            </DialogContentText>
            <List>
             {/* eslint-disable-next-line */}
              {dates.map((date) => {
                if (this.props.currentChosenClasses[date].length !== 0){
                  return(
                    <div>
                      <ListItem>
                        <ListItemText primary = {date}/>
                      </ListItem>
                      {this.props.currentChosenClasses[date].map((currClass) => {
                        return (
                          <List disablePadding >
                            <ListItem className='subItem'>
                              <ListItemText primary = {this.props.classMappings[currClass]} />
                              <ListItemSecondaryAction>
                                <Checkbox
                                  edge="end"
                                  onChange={() => this.handleToggle(currClass)}
                                  checked={this.state.finalClasses.includes(currClass)}
                                />
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>)
                      })}
                      <Divider component="li" />
                    </div>
                  );
                }
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button variant = 'outlined' color="primary" onClick={this.handleClose}>
              Go Back
            </Button>
            <Button variant = 'contained' onClick={this.handleRegister} color="primary">
              Register
            </Button>
          </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}