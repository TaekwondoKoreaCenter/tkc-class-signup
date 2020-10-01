import React from 'react';
import {
  Card,
  Grid,
  CardContent,
  Button,
  // FormControlLabel,
  // Checkbox,
  // Tooltip
} from '@material-ui/core';
import './classCard.css';


export default class ClassCard extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      clicked: this.props.isChosen
    });
  }

  handleAddClass(classId){
    let clickedState = this.state.clicked? false: true
    this.setState({
      clicked: clickedState
    });
    this.props.chosenClass({'classId': classId, 'clicked': clickedState});
  }

  render(){
    const session = this.props.session;
    // const dayOfWeek = this.props.dayOfWeek;
    const {clicked} = this.state;

    return(
      <Card className = {clicked? 'cardClicked': 'cardUnClicked'}>
        <CardContent>
          <div className = 'cardHeader'>
            {session['className'] + ' (' + session['time'][0].toString() + ')'}
          </div>
          <Grid container direction='row' justify='space-between'>
            <Grid item>
              <div className = 'classStatus'>
                {'Capacity: ' + session['status'] + "/10"}
              </div>
              {/* <Tooltip arrow = {true} title = {"Add all available " + dayOfWeek.toString() + " (" + session['time'][0].toString() + ") " + session['className'] + "es"}>
                <FormControlLabel
                  value={1}
                  control={<Checkbox name="checkedA" />}
                  label="Add for month"
                />
              </Tooltip> */}
            </Grid>
            
            <Grid item>
              <Button variant = 'contained' disableElevation color = {clicked? 'secondary':'primary'} onClick={() => {this.handleAddClass(session['classId'])}} className='classCardButton'> 
                {clicked? "X": "Add"}
              </Button> 
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}